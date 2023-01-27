$('.id input').focusout(function() {

  let num = $('.id input').val().length;
  let spell = $('.id input').val()

  if(num == 0) {
  $('.warning').css('display', 'block');
} else if(num<5 || num > 20) {
  $('.warning').css('display', 'none');
  $('.warning2').css('display', 'block');
} else if(5<num<20) {
  $('.congrat').css('display', 'block');
}
})

$('.password input').focusout(function() {

  let num = $('.password input').val().length;

  if(num == 0) {
  $('.warning').css('display', 'block');
  }
})

$('.password2 input').focusout(function() {

  let spell = $('.password input').val();
  let spell2 = $('.password2 input').val();

  if(spell != spell2) {
  $('.warning4').css('display', 'block');
  }
})

$('.name input').focusout(function() {

  let num = $('.name input').val().length;

  if(num == 0) {
  $('.warning').css('display', 'block');
  }
})

$('.birth-gender .year').focusout(function() {

  let num = $('.birth-gender .year').val().length;

  if(num == 0) {
  $('.warning5').css('display', 'block');
  }
})

$('.birth-gender .month').focusout(function() {

  let num = $('.birth-gender .month').val();

  if(num == 0) {
  $('.warning6').css('display', 'block');
  }
})

$('.birth-gender .date').focusout(function() {

  let num = $('.birth-gender .date').val().length;

  if(num == 0) {
  $('.warning7').css('display', 'block');
  }
})

$('.radio-box').on('click', function(){
  if($(this).hasClass('radiochk')) {
    // 굳이 .radio-box:first=child라고 쓸 필요 없다. this라는 것은 클래스만 말하는 것이 아니라 클릭된 클래스이기 때문에 이름이 같아도 상관이 없다.
    $(this).removeClass('radiochk');
    // $(this).removeAttr('checked');
  } else {
    $(this).addClass('radiochk');
    // $(this).attr('checked', 'checked');
  }
})







