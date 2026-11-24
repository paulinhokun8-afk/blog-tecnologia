
const API = "https://jsonplaceholder.typicode.com";

// Elementos HTML
const listaPosts = document.getElementById("lista-posts");
const mensagem = document.getElementById("mensagem");
const secaoInicio = document.getElementById("inicio");
const secaoDetalhes = document.getElementById("detalhes");

let postAtual = null;


const publicacoesPT = [
    {
        titulo: "O futuro da inteligência artificial",
        descricao: "Descubra como a inteligência artificial está transformando o mundo e revolucionando diversas áreas da tecnologia."
    },
    {
        titulo: "A importância da programação",
        descricao: "Aprenda por que a programação é uma das habilidades mais importantes no mercado de trabalho atual."
    },
    {
        titulo: "Tecnologia e inovação no dia a dia",
        descricao: "Conheça as principais inovações tecnológicas que estão facilitando nossas atividades cotidianas."
    },
    {
        titulo: "O que é desenvolvimento web?",
        descricao: "Entenda como funcionam os sites e quais tecnologias são utilizadas para desenvolvê-los."
    },
    {
        titulo: "Segurança digital na internet",
        descricao: "Descubra como proteger seus dados pessoais e navegar com mais segurança pela internet."
    },
    {
        titulo: "O crescimento da computação em nuvem",
        descricao: "Saiba como a computação em nuvem está mudando a maneira como armazenamos e compartilhamos informações."
    },
    {
        titulo: "As principais linguagens de programação",
        descricao: "Conheça algumas das linguagens mais utilizadas por desenvolvedores em todo o mundo."
    },
    {
        titulo: "A evolução dos dispositivos móveis",
        descricao: "Veja como os smartphones e tablets evoluíram e transformaram nossa comunicação."
    },
    {
        titulo: "Inteligência artificial no cotidiano",
        descricao: "Conheça exemplos de como a inteligência artificial está presente em nossas atividades diárias."
    },
    {
        titulo: "O futuro da tecnologia",
        descricao: "Explore tendências tecnológicas que poderão transformar a sociedade nos próximos anos."
    },
    {
        titulo: "A importância da inovação",
        descricao: "Entenda como a inovação contribui para o desenvolvimento de empresas e da sociedade."
    },
    {
        titulo: "Aprendendo JavaScript",
        descricao: "Conheça os primeiros passos para desenvolver páginas interativas utilizando JavaScript."
    }
];

const comentariosPT = [
    {
        name: "Mariana Oliveira",
        email: "mariana@email.com",
        body: "Excelente publicação! O conteúdo está muito interessante e esclarecedor."
    },
    {
        name: "Lucas Santos",
        email: "lucas@email.com",
        body: "Gostei bastante do assunto. Espero ver mais conteúdos como este!"
    },
    {
        name: "Ana Costa",
        email: "ana@email.com",
        body: "Muito bom! A tecnologia está realmente transformando nosso cotidiano."
    }
];


async function carregarPosts() {

    try {

        const [respostaPosts, respostaUsuarios] = await Promise.all([
            fetch(`${API}/posts?_limit=12`),
            fetch(`${API}/users`)
        ]);

        if (!respostaPosts.ok || !respostaUsuarios.ok) {
            throw new Error("Erro ao buscar dados.");
        }

        const posts = await respostaPosts.json();
        const usuarios = await respostaUsuarios.json();

        listaPosts.innerHTML = "";
        mensagem.textContent = "";

        posts.forEach((post, indice) => {

            const usuario = usuarios.find(
                user => user.id === post.userId
            );

            const conteudoPT = publicacoesPT[indice];

            const card = document.createElement("div");
            card.className = "post-card";

            const imagem = document.createElement("img");
            imagem.src = `https://picsum.photos/seed/blog${post.id}/600/400`;
            imagem.alt = "Imagem ilustrativa da publicação";

            const conteudo = document.createElement("div");
            conteudo.className = "post-content";

            const titulo = document.createElement("h3");
            titulo.textContent = conteudoPT.titulo;

            const descricao = document.createElement("p");
            descricao.textContent = conteudoPT.descricao;

            const autor = document.createElement("p");
            autor.textContent = "Autor: " + (usuario?.name || "Desconhecido");

            const botao = document.createElement("button");
            botao.className = "btn";
            botao.textContent = "Ler publicação";

            botao.addEventListener("click", () => {
                abrirPost(post.id);
            });

            conteudo.appendChild(titulo);
            conteudo.appendChild(descricao);
            conteudo.appendChild(autor);
            conteudo.appendChild(botao);

            card.appendChild(imagem);
            card.appendChild(conteudo);

            listaPosts.appendChild(card);

        });

    } catch (erro) {

        mensagem.textContent =
            "Não foi possível carregar as publicações. Tente novamente.";

        console.error(erro);

    }
}


async function abrirPost(id) {

    secaoInicio.classList.add("hidden");
    secaoDetalhes.classList.remove("hidden");

    document.getElementById("post-completo").textContent =
        "Carregando publicação...";

    document.getElementById("lista-comentarios").textContent =
        "Carregando comentários...";

    document.getElementById("mensagem-comentario").textContent = "";

    try {

        const respostaPost = await fetch(`${API}/posts/${id}`);

        if (!respostaPost.ok) {
            throw new Error("Erro ao carregar publicação.");
        }

        const post = await respostaPost.json();

        postAtual = post;

        const conteudoPT = publicacoesPT[id - 1];

        const artigo = document.getElementById("post-completo");
        artigo.innerHTML = "";

        const div = document.createElement("div");
        div.className = "post-detalhado";

        const titulo = document.createElement("h2");
        titulo.textContent = conteudoPT?.titulo || "Publicação";

        const texto = document.createElement("p");
        texto.textContent = conteudoPT?.descricao || "Conteúdo não disponível.";

        const numero = document.createElement("p");
        numero.textContent = "Publicação número: " + post.id;

        div.appendChild(titulo);
        div.appendChild(texto);
        div.appendChild(numero);

        artigo.appendChild(div);

        mostrarComentarios(comentariosPT);

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    } catch (erro) {

        document.getElementById("post-completo").textContent =
            "Erro ao carregar a publicação.";

        document.getElementById("lista-comentarios").textContent =
            "Não foi possível carregar os comentários.";

        console.error(erro);

    }
}


function mostrarComentarios(comentarios) {

    const lista = document.getElementById("lista-comentarios");

    lista.innerHTML = "";

    comentarios.forEach(comentario => {

        const card = document.createElement("div");
        card.className = "comentario-card";

        const nome = document.createElement("h4");
        nome.textContent = comentario.name;

        const email = document.createElement("small");
        email.textContent = comentario.email;

        const texto = document.createElement("p");
        texto.textContent = comentario.body;

        card.appendChild(nome);
        card.appendChild(email);
        card.appendChild(texto);

        lista.appendChild(card);

    });

}


document.getElementById("form-comentario")
.addEventListener("submit", async function(event) {

    event.preventDefault();

    if (!postAtual) {
        return;
    }

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const texto = document.getElementById("comentario").value.trim();

    const mensagemComentario =
        document.getElementById("mensagem-comentario");

    if (!nome || !email || !texto) {
        mensagemComentario.textContent =
            "Preencha todos os campos.";
        return;
    }

    try {

        const resposta = await fetch(`${API}/comments`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                postId: postAtual.id,
                name: nome,
                email: email,
                body: texto

            })

        });

        if (!resposta.ok) {
            throw new Error("Erro ao enviar comentário.");
        }

        const novoComentario = await resposta.json();

        const lista = document.getElementById("lista-comentarios");

        const aviso = document.createElement("p");
        aviso.textContent = "Seu comentário foi enviado com sucesso!";
        aviso.style.color = "green";

        mensagemComentario.replaceChildren(aviso);

        const card = document.createElement("div");
        card.className = "comentario-card";

        const titulo = document.createElement("h4");
        titulo.textContent = novoComentario.name;

        const emailElemento = document.createElement("small");
        emailElemento.textContent = novoComentario.email;

        const textoElemento = document.createElement("p");
        textoElemento.textContent = novoComentario.body;

        card.appendChild(titulo);
        card.appendChild(emailElemento);
        card.appendChild(textoElemento);

        lista.prepend(card);

        document.getElementById("form-comentario").reset();

    } catch (erro) {

        mensagemComentario.textContent =
            "Não foi possível enviar o comentário.";

        console.error(erro);

    }

});


function voltarInicio() {

    secaoDetalhes.classList.add("hidden");
    secaoInicio.classList.remove("hidden");

    postAtual = null;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


carregarPosts();
