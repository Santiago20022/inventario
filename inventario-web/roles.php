<?php

 include 'index.php';



 $nombre = $_POST['nombre']; 
 $descripcion = $_POST['descripcion'];
 $prueba1 = $_POST('prueba1');
 $prueba2 = $_POST('prueba2');



if (isset($_POST['Enviar'])){
  $query = "INSERT INTO roles(nombre, descripcion, createdAt, updatedAt) 
  VALUES ('$nombre', '$descripcion', '$prueba1', '$prueba2')";
  $consulta = mysqli_query($conexion, $query);
  echo "<script>alert('Los datos se registraron correctamente'); </script>";
    echo "<a href='navbar.html'>Regresar</a>";

  }  
?>


