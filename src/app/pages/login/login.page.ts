import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/servicio/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string = '';  // Inicializar como cadena vacía
  pass: string = '';   // Inicializar como cadena vacía

  constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private authService: AuthService,
    private firestore: AngularFirestore,
    private router: Router,
    private loadingController: LoadingController,
  ) { }

  ngOnInit() {}

  async login() {
    try {
      const loading = await this.loadingController.create({
        message: 'Cargando.....',
        duration: 2000
      });

      const email = this.email;
      const pass = this.pass;

      // Verificar si ambos campos están llenos
      if (!email || !pass) {
        await this.presentAlert('Error', 'Debes ingresar el email y la contraseña');
        return;
      }

      const aux = await this.authService.login(email, pass);

      if (aux.user) {
        console.log('UID del usuario autenticado:', aux.user.uid);
        
        localStorage.setItem('usuarioLogin', email);

        await loading.present();
        setTimeout(async () => {
          await loading.dismiss();
          this.router.navigate(['/cop']); // Redirige a una página general sin verificar el tipo
        }, 2000);
      }
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al iniciar sesión.',
        confirmButtonText: 'OK',
        heightAuto: false
      });
      this.pass = '';  // Limpiar el campo de la contraseña en caso de error
    }
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ['Aceptar'],
    });

    await alert.present();
  }
}
