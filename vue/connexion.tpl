<!DOCTYPE html>
<html>
    <head>
        <meta charset ="UTF-8" >
		<title> Map </title>	
        <link rel = "stylesheet" href = "./vue/css/map_style.css">
	</head>

    <body >
		<div class="background-image-container " id="bg-gif"></div>
        <div class="container">
			<h1>Connexion</h1>
			<form action="index.php?controle=map&action=connexion" method="post">
				<label>Nom : </label>
                <input name="nom" type="text" value= "<?php echo($nom); ?>" >
				
				<label >Mot de passe : </label>
                <input name="mdp"  type="password" value= "<?php echo($mdp) ?>" >
				
				<input type="submit" value="Se connecter">
			</form>
		</div>

        <div> <?php echo $msg; ?> </div>
    </body>
</html>