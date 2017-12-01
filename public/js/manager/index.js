var listMenu = ['formMenu', 'formDrink'];
var currentContain = document.getElementById('formMenu');
var selectTab = (contain) => {
    $(currentContain).hide();
    $(contain).show();
    currentContain = contain;
}