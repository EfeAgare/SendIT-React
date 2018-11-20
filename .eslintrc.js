module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    
    "extends": "airbnb-base",
    "parserOptions": {
        "ecmaVersion": 2015,
        "sourceType": "module"
    },
    "rules": {
        "indent": [
            "error",
            4
        ],
        "max-len": ["error", { "code": 80 }],
        "linebreak-style": [
            "error",
            "windows"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always", { "omitLastInOneLineBlock": true }
        ],
        "valid-jsdoc": ["error", {
            "requireReturn": true,
            "requireReturnType": true,
            "requireParamDescription": false,
            "requireReturnDescription": true,
            "no-console": "off"
          }],
          "require-jsdoc": ["error", {
              "require": {
                  "FunctionDeclaration": true,
                  "MethodDefinition": true,
                  "ClassDeclaration": true,
                  "ArrowFunctionExpression": true, 
                  "FunctionExpression": true
              }
          }]

    }
};