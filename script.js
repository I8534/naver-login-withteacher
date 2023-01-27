// label 태그를 클릭했을 때 실행할 함수
$('label').on('click', function(e){
  // label을 클릭했을 때 행위를 매개변수 e라는 것에 넣은 것이다.
  // form안에 있는 input을 전송하는 동작을 e.preventDefault();로 중단
  //그리고 toggleClass는 체크드가 있으면 없에고 없으면 추가해준다
  e.preventDefault();
  // 지금이야 백엔드랑 결합을 안 해서 그렇지 form 형식상 input을 클릭하면 넘어간다.그걸 막아주기 위해서이다.
  $(this).children('.checkbox-img').toggleClass('checked');

  if($(this).children('.checkbox-img').hasClass('checked')) {
    // .checkbox-img가 checked 클래스를 가지고 있을 때 실행할 코드
    $(this).children('input[type="checkbox"]').attr('checked', 'checked');
    // label의 자손의 input checkbox의 input의 checked를 없으면 있게하는 코드다. checked를 두번써야 한다.
  } else {
    //.checkbox-img가 checked 클래스를 가지고 있지 않을 때 
    $(this).children('input[type="checkbox"]').removeAttr('checked');
    //이것은 'input[type="checkbox"]'의 checked를 없에겠다는 의미
  }
})

// total에 체크하면 .agree 체크
// total에 언체크하면 .agree 언체크
$('.total label').on('click', function(){
  if($(this).find('.checkbox-img').hasClass('checked')) {
    // 모든 .agree라는 클래스를 가진 것들이 체크
    // find라고 쓴 이유는 자손 클래스가 아니니깐 find 즉 찾아내서 적용해라는 것
    $('.agree').find('.checkbox-img').addClass('checked');
    $('.agree').find('input[type="checkbox"]').attr('checked', 'checked');
    // input checkbox의 input의 checked를 없으면 있게하는 코드다. checked를 두번써야 한다.
  } else { 
    $('.agree').find('.checkbox-img').removeClass('checked');
    $('.agree').find('input[type="checkbox"]').removeAttr('checked');
  }
})

$('#cancel').on('click', function() {
  location.href = "https://www.naver.com";
  // 취소 클릭하면 네이버로 넘어가게 만든 것이다.
})

// #submit 버튼을 클릭했을 때 필수동의 사항에 모두 체크했는지 확인하는 것
// 모두 체크되어 있으면 통과
// 체크 안된 게 있다면 #red-alert를 보여주고 전송 중지 
$('#submit').on('click', function(e) {
  let req = $('.req').length;
  //req라는 변수를 선언하는데 그 변수는 req 클래스 갯수를 말하는 것
  let chkreq = $('.req .checked').length;
  let unchk = req - chkreq;

  if(unchk==0) {
    $('#form1').submit();
  } else {
    e.preventDefault();
    //form이 제출되지 못하게 막고 
    $('#red-alert').css('visibility', 'visible');
    //#red-aler가 보이게 만들어줘야 한다.
  }
})