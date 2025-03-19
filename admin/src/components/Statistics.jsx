import { useEffect, useState } from 'react';
import { fetchWithAuth } from '../utils/fetchWithAuth';
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend } from 'recharts';
import styles from '../styles/Statistics.module.css';

export default function Statistics({ token, onLogout }) {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchWithAuth(
        'https://tahar.projetsmmichamps.fr/API/index.php',
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
        onLogout
      );

      if (!res) return;
      const data = await res.json();
      setReservations(data);
    };

    fetchData();
  }, []);

  // Regroupement par date
  const reservationsByDay = reservations.reduce((acc, r) => {
    const date = r.date_time;
    if (!acc[date]) {
      acc[date] = { date, count: 0, participants: 0 };
    }
    acc[date].count++;
    acc[date].participants += Number(r.participants);
    return acc;
  }, {});

  const formatDate = (isoDate) => {
    const d = new Date(isoDate);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };  

  const dataByDay = Object.values(reservationsByDay).map(item => ({
    ...item,
    date: formatDate(item.date),
  }));

  dataByDay.sort((a, b) => new Date(a.date.split('/').reverse().join('-')) - new Date(b.date.split('/').reverse().join('-')));


  // Code promo
  const promoData = [
    { name: 'Avec code promo', value: reservations.filter(r => r.promo_code === '1').length },
    { name: 'Sans code promo', value: reservations.filter(r => r.promo_code !== '1').length },
  ];

  const COLORS = ['#00C49F', '#FF8042'];

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Statistiques</h2>

      <div className={styles.graphContainer}>
        <h3>Réservations par jour</h3>
        <BarChart width={600} height={300} data={dataByDay}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </div>

      <div className={styles.graphContainer}>
        <h3>Moyenne de participants par jour</h3>
        <BarChart width={600} height={300} data={dataByDay}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Bar dataKey={(entry) => (entry.participants / entry.count).toFixed(2)} fill="#82ca9d" />
        </BarChart>
      </div>

      <div className={styles.graphContainer}>
        <h3>Répartition code promo</h3>
        <PieChart width={400} height={300}>
          <Pie
            data={promoData}
            cx={200}
            cy={150}
            innerRadius={60}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            label
          >
            {promoData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>
  );
}
