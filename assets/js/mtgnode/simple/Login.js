// Simple login actions
$(document).ready(function(){

  // Override connect
  $('.override-connect').click(function(){
    $.post('ajax/login/authenticate', {username: $(this).attr('username'), password: $(this).attr('password')}, function(result){
      if(!!result.authenticated){
        location.href = '/lobby';
      }
      else{
        alert('Wrong Login');
      }
    });
  });
});