$(function() {
    $('#menu a').click(function() {
      $.ajax({
        url:$(this).attr('data_target'),
        cache: false,
        success: function(html) {
          $("#content").html(html);
        }
      });
      return false;
    });
  });


