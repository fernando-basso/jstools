out = console.log;

function id( id ) {
    return document.getElementById( id );
}

function tag( tag, start ) {
    start = start || document;
    return start.getElementsByTagName( tag );
}

function fCh( elem ) {

    var child = elem.firstChild;

    while ( child && child.nodeType !== 1 ) { // Node.ELEMENT_NODE
        child = child.nextSibling;
    }

    return child;
}

function lCh( elem ) {

    var child = elem.lastChild;

    while ( child && child.nodeType !== 1 ) {
        child = child.previousSibling;
    }

    return child;
}

function nSibl( elem ) {

    var sibl = elem.nextSibling;

    while ( sibl && sibl.nodeType !== 1 ) {
        sibl = sibl.nextSibling;
    }

    return sibl;
}

function pSibl( elem ) {

    var sibl = elem.previousSibling;

    while ( sibl && sibl.nodeType !== 1 ) {
        sibl = sibl.previousSibling;
    }

    return sibl;
}

function lCh( elem ) {

    var child = elem.lastChild;

    while ( child && child.nodeType !== 1 ) {
        child = child.previousSibling;
    }

    return child;
}

if ( ! String.prototype.trim ) {
    String.prototype.trim = function() {
        return this.replace( /^\s+|\s+$/g, '');
    };
}

/**
 * Encontra os nodes filhos de um node, mas somente os filhos imediatos.
 *
 * @param DomNode elem O elemento do qual se pretende encontrar os filhos.
 * @return Array arr O array contendo zero ou mais nodes filhos de 'elem'.
 */
function children( elem ) {

    var arr = []; // Array vazio.

    var child = fCh( elem );

    do {
        arr[ arr.length ] = child; // Adiciona no final do array.
        child = nSibl( child );
    } while ( child );

    return arr;
}

function getText( elem ) {

    var text = '';

    /**
     *  Se o elemento possui childNodes, pegamos eles e os colocamos
     * no array, senão, assumimos que "elem" já era um array.
     */
    var arr = elem.childNodes || elem;

    for ( var i = 0; i < arr.length; i++ ) {

        if ( arr[i].nodeType != 1 ) {
            text += arr[i].nodeValue;
        }
        else {
            text += getText(arr[i].childNodes);
        }
//        text += arr[i].nodeType != 1 ? arr[i].nodeValue : getText(arr[i].childNodes);
    }

    return text;
}

function emailCheck( email ) {
    var re = /^([\w_\-\.])+@([\w_\-\.])+\.([\w]{2,4})$/;
    // Nem precisariaa ? true : false...
    return ! re.test( email.value ) ? false : true;
}

/**
 * Transforma uma string de texto html em html entities.
 *
 * @param String html String contento <html> para ser transformado em &lt;html&gt;
 * @returns String o html em forma the entities.
 */
function html2ent( html ) {
    var esc = document.createElement( 'textarea' );
    esc.innerHTML = html;
    return esc.innerHTML;
}

/**
 * Transforma uma string <tag>texto...</tag> em DOM nodes.
 *
 * @param String insertMe Uma string como '<li>item 1</li><li>item 2</li>'.
 * @returns Array Um array do nodes prontos para serem inseridos no DOM.
 */
function makeNodes( insertMe ) {

    var arr = [];

    // Se não for array, transforma em array, pois todo o resto
    // da  função trabalha com um array.
    if ( insertMe.constructor != Array ) {
        insertMe = [ insertMe ];
    }

    for ( var i = 0; i < insertMe.length; ++i ) {

        if ( insertMe[i].constructor == String ) {

            var div = document.createElement( 'div' );
            div.innerHTML = insertMe[ i ];

            var len = div.childNodes.length;
            for ( var j = 0; j < len; ++j ) {
                console.log( j );
                arr[ arr.length ] = div.childNodes[ j ];
            }
        }
        else if ( a[ i ].length ) {

            for ( var j = 0; j < a.length; ++j ) {
                arr[ arr.length ] = arr[ i ][ j ];
            }
        }
        else {
            arr[ arr.length ] = a [ i ];
        }
    }

    return arr;
}

/**
 * @param Node Object pai A tag pai que receberá os nodes filhos.
 * @param Array nodesArr O array de nodes a serem inseridos.
 * @returns {undefined}
 */
function append( pai, nodesArr ) {
    for ( var i = 0; i < nodesArr.length; ++i ) {
        pai.appendChild( nodesArr[ i ] );
    }
}

/**
 *
 * @param Objeto Tag pai A tag pai, a qual receberá os demais nodes filhos.
 * @param Objeto Filho antesDesse O node antes do qual os demais serão inseridos.
 * @param Array nodesArr Um array de nodes a serem inseridos.
 * @returns {undefined}
 */
function prepend( pai, antesDesse, nodesArr ) {
    for ( var z = 0; z < nodesArr.length; ++z ) {
        pai.insertBefore( nodesArr[ z ], antesDesse );
    }
}

/**
 * Verifica se um Node possui a classe especificada.
 *
 * @param String name O nome da classe.
 * @param Node elem O elemento que deve ser testado se tem a classe ou não.
 * @returns Boolean true se tem a classe, senão false.
 */
function hasClass( name, elem ) {

    // Aceita zero ou um espaço antes ou depois do nome da
    // classe.
    var re = new RegExp('(^|\\s)' + name + '(\\s|$)');
    return re.test(elem.className);
}

/**
 * Adiciona a classe no elemento.
 * @param String name A classe a ser inserida.
 * @param Node elem Uma referência a uma tag.
 * @returns undefined.
 */
function addClass(name, elem) {
    var strClass = elem.className;
    // Se já tem alguma classe especificada...
    if (strClass != '' && ! hasClass(name, elem)) {
        // Adicionamos mais um espaço e a nova classe na string.
        strClass += ' ' + name;

        // NOTA: Se usar
        // strClass = + ' ' + name;
        // o + ' ' converte para número, zero no caso.
    }
    else {
        strClass = name;
    }
    elem.setAttribute('class', strClass);
}

/**
 * Remove uma class do Node.
 *
 * A função verifica se a classe existe antes.
 *
 * @param String name O nome da classe a ser removida.
 * @param Node elem O node que terá a classe removida.
 * @returns undefined.
 */
function remClass( name, elem ) {

    var cur = elem.className;
    if ( hasClass(name, elem)) {
        var re = new RegExp('(^|\\s)' + name + '(\\s|$)');
        var newClass = cur.replace(re, '');
        elem.setAttribute('class', newClass);

        // TODO: Talvez tenha que ver se as vêzes não sobram espaços perdidos.
        // Nos testes, aparentemente estava ok mas...
    }
}

/**
 * Busca elementos que contenham a classe especificada.
 *
 * @param String className O nome da classe desejada.
 * @param Node start O node a partir de onde iniciamos a busca.
 * @returns Array || null Retorna um array de nodes ou null
 */
function getByClass( className, start ) {

    var nodes = tag( '*' );
    var arr = [];

    for ( var z = 0; z < nodes['length']; ++z ) {
        var cur = nodes[ z ];
        if ( hasClass( className, cur ) ) {
            arr[ arr.length ] = cur;
        }
    }

    return arr;
}

/**
 * Prepara dados para envio por ajax.
 *
 * @param Object/Array data Um Objeto ou Array que será serializado.
 * @returns String Uma string com os dados serializados, prontos para o envio por ajax.
 */
function serialize( data ) {
    var arr = [];

    if ( data.constructor == Array ) {
        for ( var z = 0; z < data.length; ++z ) {

            // Assume que são campos de formulário.
            arr.push( data[ z ].name + '=' + encodeURIComponent( data[ k ].value ) );
        }
    }
    else {
        for ( var key in data ) {
            arr.push( key + '=' + encodeURIComponent( data[ key ] ) );
        }
    }

    return arr.join('&');
}

/**
 * NO MOMENTO ESSA FUNÇÃO SÓ FUNCIONA PARA RETORNO TEXTO / HTML (não suporta xml ainda).
 */
function ajax( options ) {

    /**
     * Seta os parâmetors que o usuário passou o coloca
     * valores default.
     */
    var args = {
        'type': options.type || 'POST',
        'url': options.url || '',
        'data': options.data,
        'time': options.timeout || 60000,
        'onSuccess': options.onSuccess || function(){}
    };

    // Variável para controltar o tempo que o request será considerado "expirado".
    var requestTimeOut = false;

    // Daqui args.time milisegundos vamos considerar o request expirado.
    setTimeout( function() {
        requestTimeOut = true;
    }, args.time);

    /**
     * Verifica se está tudo OK.
     */
    function checkRequestStatus() {
        return xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 304) && ! requestTimeOut;
    }

    if ( window.XMLHttpRequest ) {

        var xhr = new XMLHttpRequest();

        if ( args.type === 'GET' ) {
            args.url += '?' + serialize( args.data );
        }

        xhr.open(args.type, args.url, true);

        // O handler do onreadystatechange deve ser realmente definido/chamado
        // antes do .send().
        xhr.onreadystatechange = function() {

            if ( checkRequestStatus() ) {
                // TODO: Nem sempre será texto. Melhorar isso.
                args.onSuccess( xhr.responseText );
            }

        }

        // Seta o header necessário.
        xhr.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' );

        if ( args.type === 'GET' ) {
            out( 'Making a _GET_ request...' );
            // Com GET os dados vão na url.
            xhr.send(null);
        }
        else {
            out( 'Making a _POST_ request...' );
            // Com POST os dados vão como parâmetro do .send().
            xhr.send( serialize( args.data ) );
        }
    }
    else {
        alert('O seu navegador é muito antigo.');
    }
}
