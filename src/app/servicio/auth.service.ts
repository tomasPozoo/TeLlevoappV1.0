import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private angularFireAuth : AngularFireAuth, 
    private firestore: AngularFirestore,) { 

  }

  getUsers(): Observable<any[]> {
    return this.firestore.collection('usuarios').valueChanges();
  }

  getUserData(uid: string): Observable<any> {
    return this.firestore.collection('usuarios').doc(uid).valueChanges();
  }

  getCurrentUser() {
    return this.angularFireAuth.authState;
  }

  async editUser(usuarioId: string, updatedData: any) {
    await this.firestore.collection('usuarios').doc(usuarioId).update(updatedData);
  }

  deleteUser(uid: string) {
    return this.firestore.collection('usuarios').doc(uid).update({ disabled: true });
  }

  login(email: string, pass: string){
    return this.angularFireAuth.signInWithEmailAndPassword(email, pass);
  }

  register(email: string, pass: string){
    return this.angularFireAuth.createUserWithEmailAndPassword(email, pass);
  }

  logout() {
    return this.angularFireAuth.signOut();
  }
  
  recoveryPassword(email: string) {
    return this.angularFireAuth.sendPasswordResetEmail(email)
    .then(() => {
      console.log('Correo enviado!');
    })
    .catch((error) => {
      console.log('Error al enviar el correo!');
      throw error;
    });
  }
  
}