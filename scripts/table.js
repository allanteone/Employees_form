
function addHeader(headerSelector, keys, removeFn) {
    const $headerSelector = $(headerSelector);

    const $thElements = keys.map(function (key) {
        return $('<th>', {
            text: key
        });
    });

    $headerSelector.append($thElements);

    if (removeFn) {
        $headerSelector.append($('<th>'));
    }
}



class Table {

    constructor(headerElement, bodyElement, keys, id, removeFn) {
        this.$bodyElement = $(bodyElement);
        this.id = id;
        this.removeFn = removeFn;
        this.keys = keys;

        addHeader(headerElement, keys, removeFn);
    }


    //adding and removing (!) row from table
    addRow(object) {
        const $tableRowElement = $('<tr>');
        this.$bodyElement.append($tableRowElement);

        const $tdElements = this.keys.map(function (key) {
            return $('<td>', {
                text: object[key]
            })
        });
        $tableRowElement.append($tdElements);

        if (this.removeFn) {
            const $deleteElement = $('<td><svg width="0.7em" height="0.7em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">\n' +
                '  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>\n' +
                '  <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>\n' +
                '</svg></td>');

            $deleteElement.css('cursor', 'pointer');
            $tableRowElement.append($deleteElement);

            $deleteElement.on('click', function (event) {
                if (confirm('you are going remove employee: ' + object[this.id])) {
                    this.removeFn(object[this.id]);

                    $tableRowElement.remove();
                }
            }.bind(this))
        }
    }
}

