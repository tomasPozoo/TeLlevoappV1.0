import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-olvide',
  templateUrl: './olvide.page.html',
  styleUrls: ['./olvide.page.scss'],
})
export class OlvidePage implements OnInit {
  emailValue: string = '';
  verificationCode: string = '';
  newPassword: string = '';
  message: string = ''; 
  generatedCode: string = ''; 
  constructor(private alertController: AlertController, private toastController: ToastController) {}

  ngOnInit() {
    console.log('Olvidé mi Contraseña Page initialized');
  }

  async sendVerificationCode() {
    
    const user = true; 
    if (user) {
      this.generatedCode = Math.random().toString(36).substring(2, 8).toUpperCase();
      const toast = await this.toastController.create({
        message: `Tu código es: ${this.generatedCode}`,
        duration: 9000,
        color: 'warning',
        position: 'bottom'
      });
      await toast.present();
    }
    this.message = 'Se ha enviado un código de verificación a tu correo.'; 
  }

  async resetPassword() {
    
    if (this.newPassword && this.verificationCode) {
      const alert = await this.alertController.create({
        header: 'Contraseña Restablecida',
        message: 'Tu contraseña ha sido restablecida exitosamente.',
        buttons: ['OK'],
      });
      await alert.present();
      this.message = 'Tu contraseña ha sido restablecida exitosamente.';
      
      this.emailValue = '';
      this.verificationCode = '';
      this.newPassword = '';
    } else {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, completa todos los campos.',
        buttons: ['OK'],
      });
      await alert.present();
      this.message = 'Por favor, completa todos los campos.';
    }
  }
}

