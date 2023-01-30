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

// 비밀번호
// #userpw input에서 focusout 됐을 때 그것의 글자수가 0이라면 (조건1)
// #userpw .warn에 '필수 정보입니다.'라고 쓴다 (실행문1) .text-red 부여
$("#userpw input").focusout(function(){
  let len = $(this).val().length;
  pwveri = false;
  if(len == 0) {
    $("#userpw .warn").html('<span class="text-red">필수 정보입니다.</span>');
    $("#userpw .inputbox img").attr("src", "images/m_icon_pw_step_01.png");
    // 이걸 넣은 이유는 조건대로 입력해서 안전 메세지가 뜬 후에 메세지를 지우면 그 안전 메세지가 안 없어져서 이걸 입력한 거다.
    $("#userpw .inputbox span").empty()

  } else if (len < 8 || len > 16) {
    $("#userpw .warn").html('<span class="text-red">8~16자 영문 대 소문자,숫자, 특수문자를 사용하세요.</span>');
    $("#userpw .inputbox p").html('<span class="text-red">사용불가</span>');
    $("#userpw .inputbox img").attr("src", "images/m_icon_pw_step_10.png");
  } else {
    pwveri = true;
    // 데이터 전송을 허가 하기 위해 true 값을 입력
    // 그리고 "#userpw .warn안에 내용을 비운다.
    // #userpw .inputbox p 한테 안전
    // #userpw .inputbox img -> 이미지 변경
    $("#userpw .warn").empty();
    // 굳이 비워야 하나 라고 생각할 수 있는데 안 비웠을 경우 이런 일이 발생할 수 있다
    // 처음에 틀렸을 때 틀린 메세지가 사라지지 않는다.
    $("#userpw .inputbox p").html('<span class="text-green">안전</span>');
    $("#userpw .inputbox img").attr("src", "images/m_icon_pw_step_04.png");
  }
})

 


  // 비밀번호 재확인
  //#userpw-chk inpu에서 focusout 됐을 때 value값의 length가 0이라면 (조건)
  // #userpw-chk .warn에 빨간 글씨로 "필수 정보입니다."
  
  // 그렇지 않다면 그것의 값과 #userpw input 안에 들어있는 값이 같은지 비교를 해야 한다.
  $("#userpw-chk input").focusout(function(){
    let userpwchk = $(this).val();
    // val로 가져오는 이유는 비밀번호가 일치하는지 확인해야 하기 때문이다.
    pwchkveri = false;
    if(userpwchk.length == 0) {
      $("#userpw-chk .warn").html('<span class="text-red">필수 정보입니다.</span>');
      $("#userpw-chk .inputbox img").attr("src", "images/m_icon_pw_step_02.png");
    } else if(userpwchk == $("#userpw input").val()) {
      pwchkveri = true;
      $("#userpw-chk .warn").empty();
      $("#userpw-chk .warn").html('<span class="text-green">일치합니다.</span>');
      $("#userpw-chk .inputbox img").attr("src", "images/m_icon_pw_step_04.png");
    } else {
      $("#userpw-chk .warn").empty();
      $("#userpw-chk .warn").html('<span class="text-red">일치하지 않습니다.</span>');
      $("#userpw-chk .inputbox img").attr("src", "images/m_icon_pw_step_04.png");
    }
  
  })

  $("#username input").focusout(function() {
    let username = $("#username input").val();
    nameveri = false;
    // JS 정규 표현식 입력값으로 체크
    // 형식 : /정규식/
    // 문자와 숫자가 아닌 것 즉 특수기호
    // ^ 아니다라는 의미
    let reg = /[^ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9]/g;
    if (username.lenght == 0) {
      $("#username .warn").html('<span class="text-red">필수 정보입니다.</span>')
    } else if(reg.test(username)) {
    // username이라는 것을 문자와 숫자가 아니라는 것을 테스트한다는 것이다.
    // 정규식을 만족하면 true, 만족하지 않으면 false 반환
      $("#username .warn").html('<span class="text-red">한글과 영문 대소문자를 사용하세요. (특수기호 사용 불가)</span>');
    } else {
      nameveri = true;
      $("#username .warn").empty();
    }
  }) 



