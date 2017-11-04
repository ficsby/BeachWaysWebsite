$(function(){
    var locations = [
        {value:'Engineering 2', data:'33.7838, -118.1141'},
        {value:'House', data:'33.781395, -118.113499'}
    ];
    
    $('#stat').autocomplete({
        lookup: locations,
        onSelect: function(suggestion) {
            $('#stat').html(suggestion.data);
        }
    });
    
    $('#en').autocomplete({
        lookup: locations,
        onSelect: function(suggestion) {
            $('#en').html(suggestion.data);
        }
    });
});