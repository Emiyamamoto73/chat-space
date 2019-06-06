$(function(){
  function buildHTML(message){
    var image = message.image ? `<img src= ${message.image}>` : "";
    var html = `<div class="message" data-id = ${message.id}>
                  <div class="upper-message">
                    <div class="upper-message__user-name">
                      ${message.user_name}
                    </div>
                    <div class="upper-message__date">
                      ${message.date}
                    </div>
                  </div>
                  <div class="lower-message">
                    <p class="lower-message__content">
                      ${message.content}
                    </p>
                      ${image}
                  </div>
                </div>`
  return html;
  }

  function insertHTML(message){
    var image = message.image ? `<img src= ${message.image}>` : "";
    var content = message.content ? `${message.content}` : "";
    var html = `<div class="message" data-id = ${message.id}>
                <div class="upper-message">
                  <div class="upper-message__user-name">
                    ${message.user_name}
                  </div>
                  <div class="upper-message__date">
                    ${message.date}
                  </div>
                </div>
                <div class="lower-message">
                  <p class="lower-message__content">
                    ${content}
                  </p>
                    ${image}
                </div>
              </div>`
  return html;
  }
  
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var message = new FormData(this);
    var url = (window.location.href);
    $.ajax({  
      url: url,
      type: 'POST',
      data: message,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $("form")[0].reset();
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
    })
    .always(() => {
      $(".form__submit").removeAttr("disabled");
    })
    .fail(function(data){
      alert('エラーが発生したためメッセージは送信できませんでした。');
    })
  })


  $(function() {
    var reloadMessages = function() {
      last_message_id = $(".message").last().data("id");  //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
      $.ajax({
        url: 'api/messages',  //ルーティングで設定した通りのURLを指定
        type: 'GET',
        dataType: 'json',
        data: {id: last_message_id}   //dataオプションでリクエストに値を含める
      })
      .done(function(messages) {
          messages.forEach(function(message){
            var html = insertHTML(message);
            $(".messages").append(html);
            $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
          })
        
        
      })
      .fail(function () {
        console.log('error')
      });
     }
     setInterval(reloadMessages, 5000);
    })
      
});