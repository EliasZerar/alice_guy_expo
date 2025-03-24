<?php
function dbConnect()
{
  try {
    $db = new PDO('mysql:host=localhost:3306;dbname=tahar_ag_resa;charset=utf8', 'tahar_ag_resa', '@JeremyAdmin1234+');
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    return $db;
  } catch (Exception $e) {
    die('Erreur : ' . $e->getMessage());
  }
}

function verifyJWT()
{
  $headers = apache_request_headers();
  error_log("En-têtes reçus : " . json_encode($headers));
  if (isset($headers['Authorization'])) {
    $token = str_replace('Bearer ', '', $headers['Authorization']);
    error_log("Token reçu : " . $token);
    $decoded = verifyToken($token);
    if ($decoded) {
      error_log("Token décodé : " . json_encode($decoded));
      return $decoded;
    } else {
      error_log("Échec du décodage du token");
    }
  } else {
    error_log("Aucun en-tête Authorization trouvé");
  }
  http_response_code(401);
  echo json_encode(["success" => false, "message" => "Token invalide ou expiré"]);
  exit;
}

function getAllReservations()
{
  $db = dbConnect();
  $query = $db->query('SELECT * FROM reservation ORDER BY id DESC');
  return $query->fetchAll(PDO::FETCH_ASSOC);
}

function getLastReservations()
{
  $db = dbConnect();
  $query = $db->query('SELECT * FROM reservation ORDER BY id DESC LIMIT 5');
  return $query->fetchAll(PDO::FETCH_ASSOC);
}

function addReservation($data)
{
  $db = dbConnect();
  $query = $db->prepare('INSERT INTO reservation (last_name, first_name, phone_number, email, date_time, participants, promo_code) 
                           VALUES (:last_name, :first_name, :phone_number, :email, :date_time, :participants, :promo_code)');

  $query->bindParam(':last_name', $data['last_name']);
  $query->bindParam(':first_name', $data['first_name']);
  $query->bindParam(':phone_number', $data['phone_number']);
  $query->bindParam(':email', $data['email']);
  $query->bindParam(':date_time', $data['date_time']);
  $query->bindParam(':participants', $data['participants']);
  $query->bindParam(':promo_code', $data['promo_code']);

  if ($query->execute()) {
    sendConfirmationMail($data);
    return "Réservation ajoutée avec succès";
  } else {
    return "Erreur lors de l'ajout de la réservation";
  }
}

function deleteReservation($id)
{
  $db = dbConnect();
  $query = $db->prepare('DELETE FROM reservation WHERE id = :id');
  $query->bindParam(':id', $id);
  if ($query->execute()) {
    return "Réservation supprimée avec succès";
  } else {
    return "Erreur lors de la suppression de la réservation";
  }
}

function updateReservation($id, $data)
{
  $db = dbConnect();
  $query = $db->prepare('UPDATE reservation 
                           SET last_name = :last_name, 
                               first_name = :first_name, 
                               phone_number = :phone_number, 
                               email = :email, 
                               date_time = :date_time,
                               participants = :participants,
                               promo_code = :promo_code
                           WHERE id = :id');

  $query->bindParam(':id', $id, PDO::PARAM_INT);
  $query->bindParam(':last_name', $data['last_name']);
  $query->bindParam(':first_name', $data['first_name']);
  $query->bindParam(':phone_number', $data['phone_number']);
  $query->bindParam(':email', $data['email']);
  $query->bindParam(':date_time', $data['date_time']);
  $query->bindParam(':participants', $data['participants']);
  $query->bindParam(':promo_code', $data['promo_code']);

  if ($query->execute()) {
    return "Réservation mise à jour avec succès";
  } else {
    return "Erreur lors de la mise à jour de la réservation";
  }
}

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

function sendConfirmationMail($reservation)
{
  $mail = new PHPMailer(true);

  try {
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'agency.studio24@gmail.com';
    $mail->Password   = 'ofos dsfu cewe oedi';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;

    $mail->setFrom('agency.studio24@gmail.com', 'Studio24');
    $mail->addAddress($reservation['email'], $reservation['first_name'] . ' ' . $reservation['last_name']);

    $mail->isHTML(true);
    $mail->CharSet = 'UTF-8';
    $mail->Subject = 'Confirmation de votre réservation';
    $mail->Body = '
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Confirmation de Réservation</title>
</head>
<body style="margin: 0; padding: 0; background-color: #ffffff; font-family: Arial, sans-serif; color: #2c2c2a;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding: 20px;">
        <table width="600" cellpadding="0" cellspacing="0" style="border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
          <tr style="background-color: #2c2c2a;">
            <td align="center" style="padding: 20px;">
              <img src="https://aliceguy.eu/images_mail/logo-agence.png?v=2" alt="Logo Agence" width="120" style="display:block;">
            </td>
          </tr>
          <tr>
            <td align="center" style="padding: 20px;">
              <img src="https://aliceguy.eu/images_mail/logo-expo.png?v=2" alt="Logo Expo" width="200" style="display:block;">
            </td>
          </tr>
          <tr>
            <td style="padding: 30px;">
              <h2 style="color: #EA5B28; margin-top: 0;">Merci pour votre réservation !</h2>
              <p style="font-size: 16px; color: #2c2c2a">Bonjour <strong>' . htmlspecialchars($reservation['first_name']) . ' ' . htmlspecialchars($reservation['last_name']) . '</strong>,</p>
              <p style="font-size: 16px; color: #2c2c2a"">Nous vous confirmons votre réservation pour l’exposition <strong>Alice Guy</strong>.</p>

              <ul style="font-size: 16px; padding-left: 20px; color: #2c2c2a"">
                <li><strong>Date de votre visite :</strong> ' . date('d/m/Y H:i', strtotime($reservation['date_time'])) . '</li>
                <li><strong>Nombre de participants :</strong> ' . htmlspecialchars($reservation['participants']) . '</li>
              </ul>

              <p style="font-size: 16px; color: #2c2c2a"">
                <strong>Adresse :</strong><br>
                22 Rue du Départ<br>
                75015 Paris
              </p>

              <p style="font-size: 16px; color: #2c2c2a"">
                <strong>Horaires de l\'exposition :</strong><br>
                Du 24 mars au 24 mai 2025<br>
                Tous les jours de 10h à 18h
              </p>

              <p style="font-size: 16px; color: #2c2c2a"">
                <strong>Paiement sur place :</strong><br>
                Montant à régler : <strong>' . (
      $reservation['promo_code'] == 1
      ? '31,50 € (remise de 10% appliquée)'
      : '35 €'
    ) . '</strong>
                  <br>
                Le paiement s’effectue à votre arrivée sur le lieu de l’exposition.
              </p>

              <p style="font-size: 16px; color: #2c2c2a">Nous avons hâte de vous accueillir !</p>

              <p style="margin-top: 40px; font-size: 14px; color: #999999;">Cet email est généré automatiquement, merci de ne pas y répondre.</p>
            </td>
          </tr>
          <tr style="background-color: #2c2c2a;">
            <td align="center" style="padding: 10px; color: #ffffff; font-size: 12px;">
              © 2025 Studio24. Tous droits réservés.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>';


    $mail->send();
    return true;
  } catch (Exception $e) {
    error_log("Erreur PHPMailer complète : " . $e->getMessage());
    error_log("Erreur PHPMailer : " . $mail->ErrorInfo);
    throw $e;
  }
}
