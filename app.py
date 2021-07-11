from flask import Flask, make_response

app = Flask(
    __name__, 
    static_url_path='',
    static_folder='./client/build'
)

@app.route('/')
def root():
    with open(f'{app.static_folder}/index.html') as fp :
        content = fp.read()
    resp = make_response(content)
    return resp
