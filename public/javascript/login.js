$(document).ready(function(){
  $('.login-form').on('submit', function(e) {
    e.preventDefault();

    // set loading state button
    $('#login-button').addClass('disabled');
    $('#login-button').text('Logging in');

    // send login request
    $.ajax({
      'url': '/login',
      'method': 'POST',
      'data': {
        'username': $('#username').val(),
        'password': $('#password').val(),
      },
      'statusCode': {
        '200': function(){
          // refresh
          window.location.href = '/';
        },
        '404': function(){
          // set loading state button
          $('#login-button').removeClass('disabled');
          $('#login-button').text('Log in');

          // set error message
          $('#error').text('Your credentials do not match our records.');
        }
      }
    });
  });
});
