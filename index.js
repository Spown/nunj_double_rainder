var nunj = require('nunjucks'),
    express = require('express'),
        app = express(),
    http = require('http'),
    nEnv = nunj.configure('./tmpl', {trimBlocks: true, lstripBlocks: true, autoescape: false, noCache: true, express: app}),
    renderN = 1,
    n = function() {}
;

function render(res) {
    nEnv.render('views/page_view.html', {t: n, getLocale: n, isEmpty: n, getLocales: n}, (err, html)=>{
        console.log('render #'+renderN++, '\n error is: \n', err && err.toString(), '\n', 'rendered content is: \n', html)
        try {
            if (err) {
                res.send('<h1>U FAIL!</h1><div>Reason: '+err.toString()+'</div>')
            } else {
                res.send(html)
            }
        } catch (exprErr) {
            console.log('express app.send(): '+exprErr.toString())
        }
    })
}

app.get('/', (req, res, next)=>{
    render(res)
})

app.listen(3000)

setTimeout(function() {
    console.log('sending for webpage content')
    http
    .request({host: 'localhost', port: 3000}, function(res) {
        res.on('data', function(chunk) {
            console.log('got webpage content length: '+chunk.toString())
        });
        res.on('end', () => {
        });
    })
    .end()
}, 1000);