var out = console.log;

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
 * Retorna o valor do atributo, ou seta um valor novo.
 *
 * Se o parâmetro 'newValue' for passado, a função assume
 * que queremos setar um novo valor novo, senão assume que
 * queremos buscar o valor do attributo 'attrName'.
 *
 * @param String aTag Uma tag, a qual retiramos o valor do atributo ou setamos um novo.
 * @param String Um node de attributo.
 * @param String [opcional] Um valor para o attributo.
 */
function attr( aTag, attrName, newValue ) {

    var z;

    if ( ! newValue ) {
        if ( aTag.hasAttribute( attrName ) ) {
            return aTag.getAttribute( attrName );
        }
        else {
            return null;
        }
    }
    else {
        aTag.setAttribute( attrName, newValue );
    }
}

/**
 * Se passar só o attrName, pega todos os elementos que contenham aquele
 * atributo, independente do valor. Se passar attrName e attrValue, só
 * pega os elementos que tenham aquele atributo com aquele valor.
 *
 * @param Object args Um objeto com as opções.
 */
function getByAttr( opts ) {

    var args = {
        'attrName': opts.attrName || null,
        'attrValue': opts.attrValue || null,
        'tagName': opts.tagName || '*'
    };

    var matches = [];

    if ( args.attrName ) {

        var nodes = tag( args.tagName );

        // se o user quer os elementos com aquele atributo e com aquele valor....
        if ( args.attrValue ) {
            for ( var i = 0; i < nodes.length; ++i ) {
                var curNode = nodes[ i ];
                if ( attr( curNode, args.attrName ) == args.attrValue ) {
                    matches.push( curNode );
                }
            }
        }
        else { // Se o user só que saber se tem aquele atributo, não importa o valor...
            for ( var i = 0; i < nodes.length; ++i ) {
                var curNode = nodes[ i ];
                if ( attr( curNode, args.attrName ) ) {
                    matches.push( curNode );
                }
            }
        }

        return matches;
    }
    else {
        return null;
    }
}

/**
 * Serializa dados para envio por ajax.
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

/**
 * Pega o valor de um parâmetro na url.
 *
 * @param String name o Nome do parâmetro na url.
 * @return String O valor do parâmetro, ou null ou '' se não existe.
 */
function getParam( name ) {

    var url;
    var i = 0;
    var len;
    var pair;

    url = window.location.href.split( '?' )[ 1 ];

    if ( url ) {
        // Assumindo que o separador vai ser &, e não &amp;
        var keyValuePairs = url.split( '&' );

        len = keyValuePairs.length;

        for ( ; i < len; ++i ) {
            // [ 0 ] é a chave, [ 1 ] é o valor.
            pair = keyValuePairs[ i ].split( '=' );
            if ( pair[ 0 ] === name ) {
                // Se tinha aquele nome, retorna o valor dele.
                return pair[ 1 ]; // Se tem a chave, o = e não tem o valor, vai retornar
                                  // uma string vazia, que é 'false' em JavaScript.
            }
        }

        return null;
    }
}

/**
 * Seta checkboxes de acordo com parâmetros NA URL.
 *
 * Parecido com o o que faríamos em php. Se a url tem aquele
 * nome=valor, deixamos campo marcado por padrão. Isso é útil
 * em casos que o usuário faz uma pesquisa em um formulário
 * e depois do reload queremos persistir as opções da pesquisa
 * no formulário.
 *
 * Se a url tem algum parâmetro que casa com algum dos checkboxes,
 * o checkbox em questão ficará marcado após o reload.
 *
 * @param Array checkboxes Um array de checkboxes.
 * @param Array values Um array de valores.
 */
function setCheckBox( checkboxes, values ) {
    for ( var z = 0; z < checkboxes.length; ++z ) {
        var curChk = checkboxes[ z ];
        for ( var k = 0; k < values.length; ++k ) {
            var curValue = values[ k ];
            if ( curChk.name == curValue && getParam( curValue ) ) {
                curChk.checked = true;
            }
        }
    }
}

/**
 * Seleciona um <option> caso o 'value' seja igual um dos
 * valores passados no array 'values'.
 *
 * @param Array selectBoxes Um array de select boxes.
 * @param Array Um array de valores.
 */
function setSelectBox( selectBoxes, values ) {
    for ( var z = 0; z < selectBoxes.length; ++z ) {
        var curBox = selectBoxes[ z ];
        for ( var k = 0; k < values.length; ++k ) {
            var curVal = values[ k ];
            out( curBox.value );
            if ( curBox.value == getParam( curVal ) ) {
                out( curVal );
                curBox.selected = true;
            }
        }
    }
}
