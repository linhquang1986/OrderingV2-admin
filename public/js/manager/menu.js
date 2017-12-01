var editMenu = null;
var dataMenu = null;
var expressions = [];
//render data to table
var renderTableMenu = (data) => {
    let menu = $('#tableMenu');
    menu.find('tbody').empty();
    for (let i = 0; i < data.length; i++) {
        let index = i + 1;
        let intent = `<tr index="${i}"><td>${index}</td><td>${data[i].name}</td><td><button onclick='delMenu("${data[i]._id}")' class='btn btn-danger'>Del</button><td><tr>`
        menu.append(intent);
    }
    //select row and bind data
    menu.children('tbody').find('tr').click((e) => {
        if (e.target.localName === 'td') {
            let index = e.currentTarget.attributes[0].value;
            editMenu = data[index]
            $('#menuName').val(editMenu.name);
        }
    })
}
var renderDropdowMenu = (data) => {
    let dropdow = $('#menuDrink');
    dropdow.empty();
    data.forEach(item => {
        let option = `<option value="${item._id}">${item.name}</option>`
        dropdow.append(option);
    })
}
//get data menu
var getAllMenu = () => {
    get('/drink/getAllMenu', data => {
        dataMenu = data;
        renderTableMenu(data);
        renderDropdowMenu(data);
    })
}
getAllMenu();
//delete menu
var delMenu = (id) => {
    let rs = dataMenu.find(d => { return d._id == id });
    _delete('/drink/delMenu/', id, (res) => {
        if (res.success) {
            post('/wit/delValue', { entitiId: "menus", value: rs.name }, res => { })
            getAllMenu();
        }
    })

}
//clear input
var clearForm = (form) => {
    $(form).find('input').val('');
    editMenu = null;
    editDrink = null;
    editOption = null;
}
//handle submit
var submitForm = (form) => {
    let error = false;
    let data = $(form).serializeArray();
    let menuData = {
        name: null
    }
    let witMenu = {
        entitiId: "menus",
        value: null,
        expressions: expressions
    }
    //validate
    data.forEach(item => {
        if (item.value === "") {
            $(form).find('.error').html('Please complete information').show();
            error = true;
            setTimeout(() => {
                $(form).find('.error').hide()
            }, 2000)
            return;
        } else {
            menuData.name = item.value;
            witMenu.value = item.value
        }
    });
    //if no error
    if (!error) {
        //check add or edit
        if (!editMenu) {
            post('/drink/addMenu', menuData, (res) => {
                post('/wit/addValue', witMenu, res => {
                    console.log(res)
                })
                clearForm(form);
                getAllMenu();
            })
        }
        else {
            post('/wit/delValue', { entitiId: "menus", value: editMenu.name }, res => {
                put('/drink/editMenu/', editMenu._id, menuData, (res) => {
                    post('/wit/addValue', witMenu, res => {
                        console.log(res)
                    })
                    clearForm(form);
                    getAllMenu();
                })
            })
        }
    }
}
$('#expression').on("keypress", function (e) {
    let expressionC = $('ul.expressions')
    if (e.which === 13) {
        let text = $('#expression').val();
        if (text != '') {
            expressions.push(text);
            expressionC.append(`<li class="list-group-item">${text}<span onclick='removeExpression(this)' class="glyphicon glyphicon-remove" style="float:right"></span></li>`)
            $('#expression').val('');
        }
    }
});

var removeExpression = (e) => {
    let parent = $(e).parent()
    expressions.pop(parent.text())
    parent.remove()
}