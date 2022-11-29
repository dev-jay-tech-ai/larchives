  $(document).ready(function(){
    $('.field .eye-off').on('click',function(){
        console.log('클릭됨')
        $('input#RegisterForm-password').toggleClass('active');
        if($('input#RegisterForm-password').hasClass('active')){
            $(this).attr('class',"eye-off").prevAll('input').attr('type',"text");
        }else{
            $(this).attr('class',"eye-off").prevAll('input').attr('type',"password");
        }
    });
  });