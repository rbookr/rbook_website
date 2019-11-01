/* toc toggle */
$('.markdown-body .toc-body>.toc-title').click( function(){
    $(this).parent().toggleClass('toc-content-hidden')
})

/* password */

$('input#password').bind('keydown',function(event){
  if(event.keyCode == "13")
  {
    //alert('你输入的内容为：' + $('#password').val());
    let password = $('#password').val()
    window.location.search = `?password=${password}`
  }
});

$('#submit').click( function(){
  let password = $('#password').val()
  window.location.search = `?password=${password}`
})
