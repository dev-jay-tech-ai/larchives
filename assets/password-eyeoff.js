  $(document).ready(function(){
    $('.field .eye-off').on('click',function(){
        $('input').toggleClass('active');
        if($('input').hasClass('active')){
          
            $(this).attr('class',"eye-off").prevAll('input').attr('type',"text");
        }else{
            $(this).attr('class',"eye-off").prevAll('input').attr('type',"password");
        }
    });
  });