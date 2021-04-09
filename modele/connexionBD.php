<?php
    function verif_connexion($nom,$cleanmdp, &$profil) {
        require ("connect.php");
        $sql="SELECT * FROM `Personne` where nom=:nom and mdp=:cleanmdp"; 
        try {
            $commande = $pdo->prepare($sql);
            $commande->bindParam(':nom', $nom, PDO::PARAM_STR);
            $commande->bindParam(':cleanmdp', $cleanmdp, PDO::PARAM_STR);
            $commande->execute();
            
            if ($commande->rowCount() > 0) {  //compte le nb d'enregistrement
                $profil = $commande->fetch(PDO::FETCH_ASSOC); //svg du profil
                return true;
            }
            else {
                return false;
            }
        }
        
        catch (PDOException $e) {
            echo utf8_encode("Echec de select : " . $e->getMessage() . "\n");
            die(); // On arrête tout.
        }
            
            
}

?>