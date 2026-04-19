---
title: Chapter 1: What Is JavaScript?
description: Placeholder, placeholder, placeholder, placeholder, placeholder, placeholder, placeholder.
tags: [You don't know Javascript yet, Note]
date: 2025-04-19
---

# The name 'JavaScript' is misleading. 

The name included "Java" because they try to cater to mostly Java developers; it included "script" to signal it's a lightweighted program.

Basically, the name Javscript was trying to signal that it is an good alternative to Java when writing program logics embedded in the web.

The similarity in syntax is mostly due to user awareness. Since the majority of Javascripts' initial users are former C (and C++) developers, Javascript adopted `{` and `}`and `;`.


    Takeaway: don't be fooled by the name "Javascript", it has little to do with the backend language Java.

# Who manages Javascript

TC39. 

It is a voluntary committee consist of 50 to 100 people from web-invested companies that meets every other month to propose changes to the language. The committee votes on what features to add and what not to.

# Brower-based JS and other JS

### JS engines
Typically, JS engines complies with TC39's specifications. 

TC39 uses backtracking and other means to avoid new updates conflicting with JS engine's existing behavior.

However, there are times that TC39's new specifications runs in direct conflicts with browser-based JS engines, but TC39 won't backdown, and JS engines would likely never comply with the new specifications. In such cases, the behavior differences are documented in Appendix B, "Additional ECMAScript Features for Web Browsers". 

These exceptions are only allowed for browser-based JS engines, other JS engines must update their implementation to comply with TC39's specifications.

### JS-like thingies that are not a part of the JS engins
There's a lot of environment-specific capabilities that looks like JS, abide by JS rules, but are in fact managed by the environment running the JS engine. 

For exmaple, the `alert(...)` functions.

These capabilities are implemented differently by environment, but JS engines behaves uniformly.

### JS-like envirnoments that are actually not JS
There are environments that looks like JS environment but is not, like the console in Developer Tools. They behave differently from JS engines in many cases.

# JavaScript paradigms

JS is a multi-paradigm language, that allows procedural, class-oriented, and FP-style code.

# Backwards compatibility and forwards compatibility

Backwards compatibility: once a code is written, the new engine update will make sure it won't corrupt it **(= old code can run in new engines)**

Forwards compatibility: including new additions to the language would not cause the program to break if it were run on in older JS engine **(= new code can run in old engines)**

JS is generally backwards compatible (TC39 tries to avoid that, but there are a few exceptions). **JS is not forward compatible.**

HTML and CSS is forwards compatible but not backwards compatible. Basically, if an older browser sees new syntax in HTML and CSS files, it skips it and renders the rest.

# Since JS is not forwards compatible ...

Some new features may not work on some browsers with older JS engines.

### For syntax mismatches ...

So JS developers should use transpiler (trans + compiler) like Babel (https://babeljs.io) to convert new codes into equivalent older syntax.

It is strongly recommended for developers to use the newest syntax so the code is "clean and communicates its ideas most effectively".

### For APIs

We can use polyfills, that is providing a definition for that missing API.

This is usually handled by transpliers like Bable as well. But occasionally we need to define the explicitly.


    Takeaway: Use the newest stable syntax, do not trade readablity for compatibility.


# Is JS an interpreted script or a compiled program?

JS code from plain code to executivable forms:

1. transpile by Babel
2. packed by Webpack and other build processes and send to JS engine
3. JS engine parses the code to an Abstract Syntax Tree (AST)
4. JS engine converts AST to a binary intermediate representation (IR)
5. The binary intermediate representation (IR) then is optimized by JIT compilier
6. JS VM executes the program

Interpreted: 
Translated to machine code line by line.

Compiled: 
Translated entirely to machine before excution.
1. typically can produce a portable (binary)
2. some optimization happens during compilation


In a interpreted language, the error on the 5th line would not be discovered until line 1-4 have been executed. However, for a compiled language, during the parsing phase, the error would be caught.

In JS's case, because reporting early errors (errors that are not strictly syntax errors), such as duplicate parameter name, are required by TC39's specifications, JS's program is parsed entirely before execution (step 3).

Additionaly, JS engines can employ multiple passes of JIT (Just-In-Time) processing/optimization on the generated code (step 5).

So in many ways, JS interpretation behaves much like compiled languages. Optimization does happen. 

The author argues that the reason why differentiating between compiled language and interpreted language is that they behave differently in reporting errors. Early error reporting is more helpful.

But JS is indeed shipped in plain codes rather than in binary forms.

# Web Assembly (WASM)

Basically, WASM allows other languages to run in JS engine, and augmented what JS and web can do. But it will not replace JS (according to the author).

Key information:
1. WASM is more akin to Assembly
2. WASM-targetd program parse and complie ahead of time, and generates a binary form, JS engine skip the parsing and complilation stage and directly work on the binary form
3. WASM allows programs in other language to be understood by JS engine
4. It allows TC39 to judge JS features without needing to consider the interests/demands in other language ecosystems
5. WASM is more like a VM that allow programs to comple once and run in varies system environments


# Strict mode

Added in 2009 with the release of ES5.

You can add "strict mode" to enforce a more "strict" syntax rule in the closure, which include but are not limited to:

1. no longer allow implict globals
2. no longer allow assigning to read-only properties
3. deletion of undeletable properties throw error
4. no longer allow duplicated parameter names
5. Eliminates `this` coercion
6. No `with` statement
7. Reserved words for future use

Strict mode mostly controls early errors. But some effect of strict mode is only observable at runtime, such as how `this` defaults to `undefined` instead of the global object.

Note that file level "strict mode" and function level "strict mode" are not compatible.

JS probably will never enforce strict mode (it is an opt-in mode now) due to backwards compatibility. But all transpiled JS are in strict mode, so the impact of not enforcing "strict mode" is reduced.

Also ES6 module format assume strict mode.

# ES?

ECMA stands for European Computer Manufacturers Association.

Ecma International is a standards organization that develops specifications for:

1. Computer systems

2. Programming languages

3. Data formats

4. Communication protocols

The following text in this section is generated by deepseek.

### ES5 (ECMAScript 5)
Released in: 2009

Significance: It was a major overhaul of the language, fixing many inconsistencies and adding crucial features that made JavaScript more reliable and robust.

Browser support: Excellent. Runs on all modern browsers (including older ones like Internet Explorer 9+).

#### Key Features Added in ES5:
Strict Mode (`"use strict"`;) – catches common coding mistakes and prevents unsafe actions.

Array methods – `.forEach()`, `.map()`, `.filter()`, `.reduce()`, etc.

Object manipulation – `Object.create()`, `Object.defineProperty()`, `Object.keys()`.

JSON support – `JSON.parse()` and `JSON.stringify()`.

Property getters/setters.

### ES6 (ECMAScript 2015)
Released in: 2015

Significance: The biggest and most famous update to JavaScript. It introduced modern programming conveniences and made JavaScript much more expressive and powerful.

Browser support: Excellent in all modern browsers (Chrome, Firefox, Safari, Edge), but not in older browsers like Internet Explorer.

#### Key Features Added in ES6 (and later called ES2015):
`let` and `const` – block-scoped variable declarations (replacing var in many cases).

Arrow functions – `() => {}` (shorter syntax, different `this` behavior).

Classes – `class`, `constructor`, `extends`, `super`.

Template literals – Backticks with `${expression}` for string interpolation.

Destructuring – `const { name, age } = person`;

Default parameters, rest/spread operators (`...`).

Modules – `import` and `export`.

Promises – for handling asynchronous operations.

Enhanced object literals.