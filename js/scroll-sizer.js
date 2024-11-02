document.addEventListener('DOMContentLoaded', adaptScroll);

window.addEventListener('resize', adaptScroll);

function adaptScroll() {
  // Obtiene la cabecera del rollo
  let scrollTop = document.getElementById('scrollTop');
  let scrollBody = document.getElementById('scrollBody');
  let scrollBottom = document.getElementById('scrollBottom');
  let text = document.getElementById('text');
  let container = document.getElementById('container');

  // Mide su altura
  let scrollTopHeight = scrollTop.getBoundingClientRect().height;
  let scrollBottomHeight = scrollBottom.getBoundingClientRect().height;

  // Le asigna un padding para colocarlo siempre
  // a una distancia determinada de la parte superior del rollo

  text.style.paddingTop = 0.6 * scrollTopHeight + 'px';

  // Mide cuánto ocupa el texto
  let textHeight = text.getBoundingClientRect().height;

  scrollBody.style.height = textHeight - scrollBottomHeight + 50 + 'px';

  container.style.height =
    0.6 * scrollTopHeight + textHeight + scrollBottomHeight + 'px';

  let ar = 1100 / 360;

  scrollBottom.style.bottom = 150 * (scrollBottomHeight / 360) + 'px';
}
