

const listProduct = document.getElementById('product-list')
localStorage.setItem('next',`https://ropa-api-pro.herokuapp.com/api/v1/provider/?page=${window.location.search.split('=')[1]}`)



function onSetItem() {

  /*
    Se encarga de añadir
    los items en la pantalla
  */


  if(localStorage.getItem('next') == 'end'){
    document.getElementById('load-btn').style.display = 'none'
  }

  fetch(localStorage.getItem('next'))
    .then(res => res.json())
    .then(res => {

      console.log(res)
      
      if(res.next == null) {
        document.getElementById('load-btn').style.display = 'none'
      }

      for(var x = 0;x<=res.results.length;x++) {
        if(res.results[x] != undefined) {
          listProduct.innerHTML += `<a target="_blank" href="${res.results[x].origin}">
            <div class="product-item">
            <div id="image-picture-${res.results[x].id}"></div>
            <div class="meta-info">
              <div id="title-container">
                <strong id="title">${res.results[x].title}</strong>
              </div>
              <div>
                <strong id="price">$ ${res.results[x].proce}</strong>
              </div>
            </div>
          </div>
          </a>`

          var el = document.getElementById(`image-picture-${res.results[x].id}`)
          el.style.width = '200px'
          el.style.backgroundPosition = 'center'
          el.style.background = 'white'
          el.style.backgroundSize = 'contain'
          el.style.backgroundImage = `url(${res.results[x].picture})`
          el.style.backgroundRepeat = 'no-repeat'
          el.style.borderRadius = '6px'

        }
      }
      

    })
    .catch(err => {
      console.log(err)
    })
    .catch(err => {
      console.log(err)
    })
}




function onPagination() {

  /*
    Se encarga de paginar los
    datos con un scroll infinito
  */

  var el = document.getElementById('load-btn').addEventListener('click',() => {
    location.href = `?page=${parseInt(window.location.search.split('=')[1]) + 1}`
  })
}



onPagination()
onSetItem()






