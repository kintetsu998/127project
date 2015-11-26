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

    var test = new FormData($(this)[0]);

    // var send = {
    //   username: $('#username').val(),
    //   password: $('#password').val(),
    //   fname: $('#fname').val(),
    //   mname: $('#mname').val(),
    //   lname: $('#lname').val(),
    //   occupation: $('#occupation').val(),
    //   company: $('#company').val(),
    //   college: $('#college').val(),
    //   degree: $('#degree').val(),
    //   country: $('#country').val(),
    //   fieldofinterest: $('#interest').val(),
    //   image: $('#picture')[0].files,
    //   experiences: (function(){
    //     var xp = [];
    //
    //     $('.exp-occupation').each(function(i, e){
    //       xp.push({occupation: $(e).val()});
    //     });
    //
    //     $('.exp-company').each(function(i, e){
    //       xp[i].company = $(e).val();
    //     });
    //
    //     return xp;
    //   })()
    // };
    //
    // console.log(send);

    // add experiences

    test.append('experiences', (function(){
      var xp = [];

      $('.exp-occupation').each(function(i, e){
        xp.push({occupation: $(e).val()});
      });

      $('.exp-company').each(function(i, e){
        xp[i].company = $(e).val();
      });

      return JSON.stringify(xp);
    })());

    $.ajax({
      url: '/api/users',
      method: 'POST',
      data: test,
      processData: false,
      contentType: false,
      success: function(){
        window.location.href = '/success';
      }
    });
  });

  // experiences
  var expCount = 1;

  $('#add-exp').on('click', function(){
    if(expCount <= 5){
      var html = '' +
        '<li class="fs-anim-lower">' +
          '<input class="fs-anim-lower exp-field exp-occupation" type="text" placeholder="Occupation"/>' +
           ' at ' +
          '<input class="fs-anim-lower exp-field exp-company" type="text" placeholder="Company"/>' +
        '</li>';

      $('#exp-list').append(html);

      if(++expCount > 5){
        $('#add-exp').remove();
      }
    }
  });
});
