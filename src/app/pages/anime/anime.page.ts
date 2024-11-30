import { Component, OnInit } from '@angular/core';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-anime',
  templateUrl: './anime.page.html',
  styleUrls: ['./anime.page.scss'],
})
export class AnimePage implements OnInit {

  constructor(private animationCtrl: AnimationController) { }

  ngOnInit() {}

  async playAnimation() {
    // Seleccionar el elemento para animar
    const animarElement = document.querySelector('#animar');

    if (animarElement) {  // Verificar que el elemento existe
      const animation = this.animationCtrl.create()
        .addElement(animarElement)  // Aplicar la animación al elemento
        .duration(3000)  // Duración de la animación en milisegundos
        .iterations(3)   // Número de veces que se repite la animación
        .fromTo('opacity', '1', '0')  // Cambiar la opacidad de 1 (visible) a 0 (invisible)
        .fromTo('transform', 'scale(1)', 'scale(0.8)');  // Reducir el tamaño

      await animation.play();  // Ejecutar la animación
    }
  }
}
