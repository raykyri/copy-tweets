// ==UserScript==
// @name        Copy Tweets
// @namespace   Violentmonkey Scripts
// @match       https://twitter.com/*
// @grant       none
// @version     1.0
// @author      selkiecrystal
// @description 3/17/2020, 2:28:06 AM
// ==/UserScript==

listener = (e) => {
  e.preventDefault();

  // select tweet and content
  const $f = document.querySelectorAll(':focus');
  if ($f.length === 0) return;
  const $tweet = $f[0];
  const $text = $tweet.querySelector('#tweet-text');
  const $user = $tweet.querySelector('#tweet-user-name');
  const $images = $tweet.querySelectorAll('[aria-label="Image"]');

  // parse text and images
  const text = $text ? $text.innerText : null;
  const user = $user ? $user.innerText : null;
  const images = Array.from($images).map($i => $i.querySelector('img'));

  // generate copied text
  const resultText = `${user.split('\n')[1]}: ${text}`;
  const result = document.createElement('div');
  const userEl = document.createElement('p');
  const spacer = document.createElement('br');
  const textEl = document.createElement('p');
  userEl.innerText = user.split('\n')[1] + ':';
  textEl.innerText = text;
  result.appendChild(userEl);
  result.appendChild(spacer);
  result.appendChild(textEl);
  images.map((img) => result.appendChild(img));
  e.clipboardData.setData('text/plain', resultText);
  e.clipboardData.setData('text/html', result.innerHTML);
};

document.body.addEventListener('copy', listener);
