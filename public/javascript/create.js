$(document).ready(function() {
  var fields = [
    { value: 'Web Development', data: 'Web Development' },
    { value: 'Web Design', data: 'Web Development' },
    { value: 'Business Management', data: 'Business Management' },
    { value: 'Academe', data: 'Academe' }
  ];

  $('#interest').autocomplete({
      lookup: fields
  });

  $('#signup-form').on('submit', function(e){
    e.preventDefault();

    console.log('sending this data');

    var send = {
      username: $('#username').val(),
      password: $('#password').val(),
      fname: $('#fname').val(),
      mname: $('#mname').val(),
      lname: $('#lname').val(),
      occupation: $('#occupation').val(),
      company: $('#company').val(),
      college: $('#college').val(),
      degree: $('#degree').val(),
      country: $('#country').val(),
      interest: $('#interest').val(),
      picture: $('#picture').val()
    };

    console.log(send);

    alert('insert ajax request here');
  });
});
