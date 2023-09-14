// hamburguer mexendo

    const hamburguer = document.querySelector("#hamburguer");

    function addActiveClass() {
        hamburguer.classList.add('fa-solid', 'fa-bars-staggered');
    }

    function removeActiveClass() {
        hamburguer.classList.remove('fa-solid', 'fa-bars-staggered');
        hamburguer.classList.add('fa-solid', 'fa-bars')
    }

    hamburguer.addEventListener("click", () => {

        if (hamburguer.classList.contains('fa-bars-staggered')) {
            removeActiveClass();
        } else {
            addActiveClass();
        }
    });

    hamburguer.addEventListener("mouseover", addActiveClass);
    hamburguer.addEventListener("mouseout", removeActiveClass);

//slider

    let count = 1; 
    document.getElementById("radio1").checked = true; 

    setInterval( function() {
        nextImage();
    }, 2000)

    //função para passar para a proxima imagem

    function nextImage() {
        count++; 

        //Faz voltar para a primeira imagem
        if(count > 3) {
            count = 1; 
        }

        document.getElementById("radio"+count).checked = true;

    }

//barra de pesquisa

const ferramentas = ['Martelo Unha 20mm Cabo de Fibra Vonder', 'Trena Laser 40m GLM 40 Bosch', 'Furadeira de Impacto Bosch com Chave de Mandril 450W 3/8', 'Esmerilhadeira Bosch Angular com Acessórios 5" 900W 220V GWS 9" 125 S', 'Jogo de Ferramentas 108 peças em Aço Cromo Vanádio Dexter', 'Lavadora de Alta Pressão Wap 1300 PSI'];

const searchInput = document.querySelector('.barra-pesquisa');
const hints = document.querySelector('.hints');

searchInput.onkeyup = ev => {
    document.querySelectorAll('.hint').forEach(hint => hint.remove());
    const input = ev.target.value;
    if (!input) return;

    const ferramentasSelecionadas = ferramentas.filter(ferramenta => ferramenta.includes(input));

    ferramentasSelecionadas.forEach(ferramenta => {
        const newHint = document.createElement('div');
        newHint.className = 'hint';
        newHint.textContent = ferramenta;

        hints.appendChild(newHint);
    });
}






