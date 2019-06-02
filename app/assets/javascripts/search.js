$(function() {
  function buildHTML(data){
    var html = `<div class='chat-group-form__field--right'>
                <div class='chat-group-form__search clearfix'>
                <input class='chat-group-form__input' id='user-search-field' placeholder='追加したいユーザー名を入力してください' type='text'>
                  </div>
                  <div id='user-search-result'></div>
                </div>`
    return html;
  }

  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
     
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
  .done(function(users) {
    // console.log(users)
    var html = buildHTML(data);
      $('.users').append(html);
      $("form")[0].reset();
      if (users.length !== 0) {
        users.forEach(function(user){
          appendProduct(user);
        });
      }
    else {
      appendErrMsgToHTML("一致するユーザーはありません");
    }
  })
  .fail(function() {
    alert('検索に失敗しました');
  })
})

});

