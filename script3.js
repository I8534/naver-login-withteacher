$("input").focusin(function() {
  $(this).parent('.inputbox').addClass('inputboxact')
  // addClass('inputboxact')여기에는 점을 생략해야 한다.
})
// input에 focus가 되었을 때 그것의 부모 .inputbox에게 inputboxact 클래스를 준다. 


$("input").focusout(function() {
  //inputboxact 클래스를 remove
  $(this).parent('.inputbox').removeClass('inputboxact')
  // addClass('inputboxact')여기에는 점을 생략해야 한다.
})

let idveri, pwveri, pwchkveri, nameveri, birthveri,genderveri, phoneveri, addressveri = false;
let mailveri = true
// 메일은 선택 사항이니깐 없어도 제출이 되어야 하기 때문에 기본값을 true로 준다.


// 아이디
// #userid input에서 focus가 아웃 되었을 때 그때 글자수가 영이라면(이게 조건이다.)
// 
$("#userid input").focusout(function() {
  let len = $(this).val().length;
  // 즉 유저 인풋에 입력된 값의 길이를 가져와라
  idveri = false
  // 다시 한번 더 확인 차 재선언한 것
  if(len == 0) {
    $("#userid .warn").html('<span class="text-red">필수 정보 입니다.</span>')
    // #userid .warn애 필수 정보입니다.라고 쓴다.
  } else if (len < 5 || len > 20) {
    $("#userid .warn").html('<span class="text-red">5~20자의 영소문자만 사용 가능합니다.</span>')
  } else {
    $("#userid .warn").html('<span class="text-green">멋진 아이디네요</span>')
    idveri = true;
  }
})