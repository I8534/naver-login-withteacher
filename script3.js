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
      // 엠티를 넣은 이유는 빨간색 필수 정보입니다가 있을 경우 이것을 지우기 위해서이다.
      $("#userpw-chk .inputbox img").attr("src", "images/m_icon_pw_step_04.png");
    } else {

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


  // 생년월일
  // #year, #month, #date에서 focusout됐을 때 실행할 함수
  // #year의 value length가 숫자 4가 아니라면(조건1)
  // #birth .warn 빨간 글씨로 태어난 년도 4자리를 정확하게 입력하세요 (실행문1)

  // #month의 값이 비어있으면(조건2)
  // #birth .warn 빨간 글씨로 "태어난 월을 선택하세요." (실행문2)
  // #month의 값이 비어있으면(조건3)
  // #birth .warn 빨간 글씨로 "태어난 일(날짜) 2자리를 정확하게 입력하세요." (실행문3)
  //만약 year month date의 값이 수사가 아니라면 -> 이때 isNaN 사용
  // 빨간 글씨로 진짜임?> 질문
  // 올해 기준으로 나이가 100 초과라면 (조건5)







  // $("#year, #month, #date").focusout(function() {
  //   let year = $("#year").val();
  //   let month = $("#month").val();
  //   let date = $("#date").val();
  //   // 현재 날짜 및 시간
  //   let now = new Date();
  //   // Date 객체의 getTime() 메서드 1970년 1월 1일 00시 0분 00초 utc 부터 얼마나 경과한 밀리초를 반환한다.
  //   // 이걸 가져오는 이유는 연도에 말도 안 되는 값을 입력하는 것을 막기 위해서이다.
  //   let nowstamp = now.getTime();
  //   // 현재 날짜 및 시간에서 현재 연도의 네 자리값을 변수에 할당한다는 의미이다.
  //   now = now.getFullYear();
  //   console.log(now);
  //   // let year = $("#year").val();
  //   // let month = $("#month").val();
  //   // let date = $("#date").val();
  //   // 값을 birth에 입력하는 것이다.
  //   let birth = new Date(year, month, date);
  //   birth = birth.getTime();
  //   birthveri = false;

  //   // year.length가 4가 아닐 때
  //   if(year.length != 4) {
  //      $("#birth .warn").html('<span class="text-red">태어난 년도 4자리를 정확하게 입력해주세요.</span>');
  //   } else if(month.length == 0) {
  //     $("#birth .warn").html('<span class="text-green">태어난 월을 선택하세요.</span>');
  //   } else if(date.length == 0) {
  //     $("#birth .warn").html('<span class="text-red">태어난 일(날짜) 2자리를 정확하게 입력하세요.</span>');
  //   } else if(isNaN(year, month, date)) {
  //     // isNaN(year, month, date) 얘네 셋이 숫자가 아닐 때 라는 의미
  //     $("#birth .warn").html('<span class="text-red">생년월일을 다시 확인해주세요.</span>');
  //   } else if(now - year > 100) {
  //     $("#birth .warn").html('<span class="text-red">정말이세요?</span>');
  //   } else if(nowstamp < birth) {
  //     $("#birth .warn").html('<span class="text-red">미래에서 오셨군요 ^^</span>');
  //   } else {
  //     birthveri = true;
  //     $("#birth .warn").empty();
  //   }
  // })


  function para(text) {
    // para라는 함수의 text에 입력된 값이 스팬 레드에 입력되게 하겠다.
    $("#birth .warn").html('<span class="text-red">' + text + '</span>');
  }

  $("#year, #month, #date").focusout(function() {
    let year = $("#year").val();
    let month = $("#month").val();
    let date = $("#date").val();
    // 현재 날짜 및 시간
    let now = new Date();
    // Date 객체의 getTime() 메서드 1970년 1월 1일 00시 0분 00초 utc 부터 얼마나 경과한 밀리초를 반환한다.
    // 이걸 가져오는 이유는 연도에 말도 안 되는 값을 입력하는 것을 막기 위해서이다.
    let nowstamp = now.getTime();
    // 현재 날짜 및 시간에서 현재 연도의 네 자리값을 변수에 할당한다는 의미이다.
    now = now.getFullYear();
    console.log(now);
    // let year = $("#year").val();
    // let month = $("#month").val();
    // let date = $("#date").val();
    // 값을 birth에 입력하는 것이다.
    let birth = new Date(year, month, date);
    birth = birth.getTime();
    birthveri = false;

    // year.length가 4가 아닐 때
    if(year.length != 4) {
      para("태어난 년도 4자리를 정확하게 입력해주세요.");
      //  $("#birth .warn").html('<span class="text-red">태어난 년도 4자리를 정확하게 입력해주세요.</span>');
    } else if(month.length == 0) {
      para("태어난 월을 선택하세요.");
      // $("#birth .warn").html('<span class="text-green">태어난 월을 선택하세요.</span>');
    } else if(date.length == 0 || date > 31 || date <= 0 ) {
      para("태어난 일(날짜) 2자리를 정확하게 입력하세요.");
      // $("#birth .warn").html('<span class="text-red">태어난 일(날짜) 2자리를 정확하게 입력하세요.</span>');
    } else if(isNaN(year * month * date)) {
      para("생년월일을 다시 확인해주세요.");
      // else if(isNaN(year, month, date)) {
      //   para("생년월일을 다시 확인해주세요.");
      // 첨에 이거였는데 else if(isNaN(year * month * date))로 바꾼 이유는 셋다 숫자가 되어야 숫자가 나오기 때문이다.
      // 중간에 이상한 글자가 들어가면 계산이 안 되기 때문이다.
      // 처음의 경우 year만 숫자여도 별 문제 없이 작동을 한다 그래서 수정한 것이다.


      // isNaN(year, month, date) 얘네 셋이 숫자가 아닐 때 라는 의미
      // $("#birth .warn").html('<span class="text-red">생년월일을 다시 확인해주세요.</span>');
    } else if(now - year > 100) {
      para("정말이세요?");
      // $("#birth .warn").html('<span class="text-red">정말이세요?</span>');
    } else if(nowstamp < birth) {
      para("미래에서 오셨군요 ^^");
      // $("#birth .warn").html('<span class="text-red">미래에서 오셨군요 ^^</span>');
    } else {
      birthveri = true;
      para("");
      // $("#birth .warn").empty();
    }
  })

// 성별
// #gender .inputbox를 클릭했을 때

$("#gender .inputbox").click(function(e) {
  // radio의 기본 클릭동작 해제
  e.preventDefault();
  $("#gender .inputbox").removeClass('btn-primary');
  $("#gender .inputbox input").removeAttr('checked');
  $(this).addClass('btn-primary');
  // 클릭된 인풋박스의 자식 중에 input 태그를 의미
  $(this).children('input').attr('checked', 'checked');
  genderveri = true;
})
 
// 본인 확인 이메일(선택)

$("#usermail input").focusout(function() {
   let mail = $(this).val();
   let redExp =  /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
   mailveri = true;
   if(mail.lenght == 0) {
    $("#usermail .warn").empty();
    // 이걸 empty로 만든 이유는 첨에 잘못 만들었을 때 잘몬만든 메일입니다라는 문구가 뜨게 할 것이다.
    // 그 문구를 지우게 하기 위해서 엠티를 넣은 것이다.
   } else if(!redExp.test(mail)) {
    // else if(!redExp.test(mail)) -> mail이 redExp의 조건을 만족하지 않았을 경우
    $("#usermail .warn").html('<span class="text-red">이메일 주소를 다시 확인해주세요</span>');
    mailveri = false;
   } else {
    $("#usermail .warn").empty();
   }
})

// 휴대전화
// #phonenum input에서 focusout 됐을 때
// 그것의 value.length가 0이라면 (조건1)
// #phone .warn "필수 정보입니다." (실행문1)
$("#phonenum input").focusout(function() {
  if($(this).val().length == 0) {
    $("#phone .warn").html('<span class="text-red">필수 정보입니다.</span>');
  } else {
    $("#phone .warn").empty();
  }
})

// #veribtn을 클릭했을 때 실행할 함수
// #phonenum input value가 10-11자리가 아니라면 (조건1)
// 
$("#veribtn").click(function() {
  let verifi = $("#phonenum input").val();
  verifi = verifi.replace(/[^0-9]/g, '');
  // verifi = verifi.replace(/[^0-9]/g, ''); 입력된 것 중에 모든 문자를 빈칸으로 대체하겠다
  // replace는 문자열 치환 매소드이다.
  $("#phonenum input").val(verifi);

  

  //지금 위 코드의 의미는 우선 input에 입력된 값을 verifi에 넣는다.
  // 그 다음 verifi의 문자와 숫자를 다 제거한 것을 다시 verifi라 명칭하자
  // 마지막으로 $("#phonenum input").val();에 문자와 숫자를 다 제거한 verifi를 입력한다.

  let veri1;
  //우선 변수만 선언했다.
  if(verifi.length < 10 || verifi.length > 11) {
    veril = false
    // 우선 전송되는 것을 막기 위해
  } else {
    veri1 = true
  }

  let veri2;
  if(!isNaN(verifi)) {// 즉 입력된 verifi가 숫자가 아니라면 이라는 뜻 !는 부정을 의미
    veri2 = true;
  } else {
    veri2 = false;
  }

  // 1. 전화번호를 형식에 맞게 입력하면 인증번호를 발급
// 2. 인증번호를 발급 받으면 인증번호 입력칸을 활성화 해얗 ㅏㄴ다.
// 3. 전화번호를 형식에 맞지 않게 입력했을 경우 인증번호 입력칸 비활성화

// veril1 && veri2 모두 true일 경우(조건1)
// 인증번호를 보내고 .warn에 "인증번호가 발송되었습니다."가 실행되었습니다. (실행문1)
// 인증번호 입력칸을 활성화 (실행문2)
if(veri1 && veri2) {
  //if(veri1 && veri2)가 의미하는 바는 veri1과 veri2가 사실일 때라는 의미이다.
  $("#phone .warn").html('<span class="text-green">인증번호가 발송되었습니다.</span>');
  $(".disinput").removeClass("disinput");
  $("#veritext").removeAttr("disabled");
  // $("#veritext").removeAttr("disabled"); 대신에 $(".disinput").removeAttr("disabled");
  //입력하면 이미 disinput class가 삭제되서 disabled 없에라는 명령어가 안 먹힌다. 왜? 없으니깐
} else {
  $("#phone .warn").html('<span class="text-red">형식에 맞지 않는 번호입니다.</span>');
  $("#veritext").attr("disabled", "disabled");
  $("#veritext").parent(".inputbox").addClass('disinput');
}

})

// #veritext에서 focusout 됐을 때 
// 그 값이 "1234"와 같다면
$("#veritext").focusout(function(){
  phoneveri = false;
  if($(this).val() == "1234") {
    phoneveri = true;
    $("#phone .warn").html('<span class="text-green">인증되었습니다.</span>');
    $(this).next("div").empty();
  } else {
    // 불일치, x 아이콘
    $("#veritext").next("div").addClass("disagree");
    // next는 형제요소를 의미하는 것이다.
    $(".disagree").html('<span class="text-red">불일치</span>');
    $("#phone .warn").html('<span class="text-red">인증번호를 다시 확인해주세요.</span>');
    $(this).parent('.inputbox').addClass('border-red');
  }
})

// 주소
// 카카오에서 제공하는 주소찾기 api 활용
// API란? Application Programming Interface의 줄임말
// 프론트앤드(클라이언트) 와 백앤드(서버)가 요청과 응답을 받을 수 있게 만들어진 체계
// api 요청에서 가장 중요한 개념은 CRUD이다. 
// CREAT, Read, Update, Delete 이 네가지 api 요청의 기본 요소 네가지이다.
// API를 만드는 역할을 하는 것이 서버 개발지이다. = 즉 백엔드 개발자

function sample6_execDaumPostcode() {
  addressveri = true;
  new daum.Postcode({
      oncomplete: function(data) {
          // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

          // 각 주소의 노출 규칙에 따라 주소를 조합한다.
          // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
          var addr = ''; // 주소 변수
          var extraAddr = ''; // 참고항목 변수

          //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
          if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
              addr = data.roadAddress;
          } else { // 사용자가 지번 주소를 선택했을 경우(J)
              addr = data.jibunAddress;
          }

          // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
          if(data.userSelectedType === 'R'){
              // 법정동명이 있을 경우 추가한다. (법정리는 제외)
              // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
              if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                  extraAddr += data.bname;
              }
              // 건물명이 있고, 공동주택일 경우 추가한다.
              if(data.buildingName !== '' && data.apartment === 'Y'){
                  extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
              }
              // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
              if(extraAddr !== ''){
                  extraAddr = ' (' + extraAddr + ')';
              }
              // 조합된 참고항목을 해당 필드에 넣는다.
              document.getElementById("sample6_extraAddress").value = extraAddr;
          
          } else {
              document.getElementById("sample6_extraAddress").value = '';
          }

          // 우편번호와 주소 정보를 해당 필드에 넣는다.
          document.getElementById('sample6_postcode').value = data.zonecode;
          document.getElementById("sample6_address").value = addr;
          // 커서를 상세주소 필드로 이동한다.
          document.getElementById("sample6_detailAddress").focus();
      }
  }).open();
}

// #joinbtn을 눌렀을 때 필수 요소가 모두 true라면(조건!)
// #join-form을 submit (실행문)

$("#joinbtn").click(function() {

  if (idveri && pwveri && pwchkveri && nameveri && birthveri && genderveri && phoneveri && addressveri) {
    $("#joinbtn").attr("type", "submit");
  } else {
    // input을 강제로 포커스아웃 시키는 이벤트를 일으킨다.
    $("input").trigger("focusout");
  }
})