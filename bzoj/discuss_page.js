var to_prob=document.querySelector('a[href^="wttl.php?pid="]');
var text_format_re=/^Problem (\d+)$/
if(to_prob && text_format_re.test(to_prob.textContent.trim())) {
    var prob_id=text_format_re.exec(to_prob.textContent.trim())[1];
    var link=document.createElement('a');
    link.href='/JudgeOnline/problem.php?id='+prob_id;
    link.textContent='[Back to Problem]';
    to_prob.parentNode.insertBefore(link,to_prob);
}