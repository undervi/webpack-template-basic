// import
const path = require('path') // node.js에서 기본적으로 제공하는 전역 모듈인 path 가지고 오기 (설치할 필요 X)
const HtmlPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

// export
module.exports = {
  // parcel index.html (cli 명령을 통해 진입점을 index.html로 설정한 것)
  // webpack 같은 경우 cli 명령이 아니고, 구성 옵션을 통해서 진입점 파일을 설정 해줘야 함
  // entry : 파일을 읽어들이기 시작하는 진입점 설정하는 옵션 
  // webpack은 html이 아닌 자바스크립트를 진입점으로 사용함
  entry: './js/main.js',

  // output : 결과물(번들)을 반환하는 설정
  output: {
    // 어떤 경로에 결과물을 내어줄 것인지 (node.js에서 필요로 하는 절대 경로)
    // resolve 메서드는 첫번째 인수와 두번째 인수에 있는 기본적인 경로를 합쳐줌
    // __dirname은 node.js 환경에서 전역적으로 사용할 수 있는 변수, 현재 파일이 있는 그 경로를 지칭함 
    // 해당하는 경로와 dist라는 폴더 이름을 합쳐서 절대 경로를 제공함
    // path: path.resolve(__dirname, 'dist'), 
    // filename: 'main.js',
    clean: true
  },

  module: {
    rules: [
      {
        test: /\.s?css$/, // .css 혹은 .scss 로 끝나는 것을 찾겠다는 의미
        // 이스케이프 문자는 백슬래스를 사용해 원래의 의미를 벗어나는 문자를 만들 수 있음
        // 정규표현식에서 마침표(.)는 '임의의 한 문자'를 의미하기 때문에,
        // 그 의미에서 벗어나 단순 마침표로 해석될 수 있도록 이스케이프 문자로 만들어줘야함
        use: [ // 아래 명시한 패키지를 사용하겠다는 의미
          'style-loader', // 해석된 내용을 html의 style 태그에 삽입하는 역할 
          'css-loader', // 자바스크립트에서 css를 해석하는 용도 
          'postcss-loader', // webpack 에서 postcss(스타일 후처리를 도와줌)를 동작 시켜줄 수 있는 로더
          'sass-loader' // webpack 에서 scss 파일을 읽어낼 수 있음
          // 순서 중요! (아래 부터 해석됨)
        ]
      },
      {
        test: /\.js$/, // js 확장자로 끝나는 것들 (main.js 등)
        use: [
          'babel-loader'
        ]
      }
    ]
  },
  
  // plugins : 번들링 후 결과물의 처리 방식 등 다양한 플러그인들을 설정
  // entry로 시작해서 js 폴더의 main.js 파일을 읽어들여서 그것에 대한 결과를 output에 있는 옵션으로 만들어 내는데,
  // 결과를 만들어내는 과정에서 plugins에 명시되어있는 여러기지 플러그인들을 활용하게 됨
  // 그 때 html-webpack-plugin을 통해서 템플릿으로 우리가 만들어 놓은 index.html을 지정한 것이고
  // 그 index.html과 우리가 결과물을 만들어내는 main.js의 병합된 합본을 dist라는 폴더에 만들어주는 역할
  plugins: [
    new HtmlPlugin({
      template: './index.html' // 상대경로로 명시
    }), // 생성자 함수처럼 실행
    new CopyPlugin({
      patterns: [
        { from: 'static'} // 우리가 만든 폴더명 명시 (해당 폴더 안에 들어있는 내용이 복사되어 dist 폴더로 들어감)
      ]
    })
  ],

  devServer: {
    host: 'localhost'
  }
}