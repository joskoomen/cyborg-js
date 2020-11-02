# Cyborg JS

![npm bundle size](https://img.shields.io/bundlephobia/minzip/@ypa/cyborg-js)
![npm version](https://img.shields.io/npm/v/@ypa/cyborg-js)

CyborgJS created to be a modern SEO friendly framework for Page Based Applications and an alternative for reactive frameworks like ReactJS and VueJS, and totally written in TypeScript.

## Structure

<div class="half first-half">
CyborgJS is created to write Javascript in a structured manor in Page Based Applications where Javascript have a supporting role towards your application. Every Application can have 3 types: 
<ul>
<li> The <code>MotherBoard</code>
<ul>
<li>This is your Cyborg entry point;</li>
<li>It's mandatory;</li>
<li>It's the center of CyborgJS;</li>
<li>It's basiccally your Application Controller.</li>
<li>A <code>Component</code></li>
<li>This connects Javascript to a <code>HTMLElement</code>;</li>
<li>It's your View Controller;</li>
<li>It's mandatory.</li>
</ul>
<li>The <code>NotificationController</code></li>
<ul>
<li>This manages all notifications;</li>
<li>It's optional.</li>
<li>It's controlled via the <code>MotherBoard</code></li>
</ul>
</div>
<div class="half second-half">
<img src="/images/structure.png" alt="CyborgJS application" style="max-width:100%;"/>
</div>
