---
layout: post
title: "Rubyの改造してThread#joinのTimeoutで例外を発生させる"
date: 2013-08-18 17:15
comments: true
categories: 
- Ruby
- Ruby C Extension
---

# ぼっちupcamp

[#upcamp](https://twitter.com/search?q=%23upcamp&src=hash) に参加しようと思ったのですが、
諸事情により行けなくなったので、一人で何か作ってました。

Ruby の 処理系の動作の改良(改悪)をしていました。

Ruby は `git clone https://github.com/ruby/ruby.git` で落としたものを使いました。

# Thread#join で タイムアウトしたときに例外を発生させる

[Thread#join](http://doc.ruby-lang.org/ja/2.0.0/method/Thread/i/join.html)は、
スレッド self の実行が終了するまで、カレントスレッドを停止させるメソッドです。
limit を指定して、limit 秒過ぎても自身が終了しない場合、nil を返します。

今回は、limit 秒を過ぎてタイムアウトした場合、
例外`Timeout` を発生させるように改造しました。

正直、自分でもネタをミスった感がありますが、
すこしはタイムアウトした場合の処理が楽に書けるようになる気がします。

## 従来のRubyの Thread#join でタイムアウトを処理する

まず、従来のRubyの `Thread#join` でタイムアウトを処理する場合のコード例を示します。

`Thread#join`の返り値が `nil`のときにタイムアウトしたと分かるので、
このように書けると思います。

``` ruby Timeout Handling Before
begin
  t = Thread.start {
    # 1秒で終わらない処理
    while true
      1
    end
  }
  isTimeout = (t.join(1) == nil)
rescue ThreadError
  puts "theread error"
ensure
  puts "timeout error" if isTimeout

  t.kill
end

# => "timeout error"
```

## 改造したRubyの Thread#join でタイムアウトを処理する

今回の改造によって、次のようにRubyのコードをスッキリさせることができます。

``` ruby Timeout Handling After
begin
  t = Thread.start {
    # 1秒で終わらない処理
    while true
      1
    end
  }
  t.join(1)
rescue TimeoutError
  puts "timeout error"
rescue ThreadError
  puts "theread error"
ensure
  t.kill
end

# => "timeout error"
```

例外処理が `rescue` 節にまとまって、コードが見やすくなります。

# 変更箇所

``` diff git diff include/ruby/ruby.h
diff --git a/include/ruby/ruby.h b/include/ruby/ruby.h
index 575a2b6..79e4289 100644
--- a/include/ruby/ruby.h
+++ b/include/ruby/ruby.h
@@ -1646,6 +1646,7 @@ RUBY_EXTERN VALUE rb_eRuntimeError;
 RUBY_EXTERN VALUE rb_eSecurityError;
 RUBY_EXTERN VALUE rb_eSystemCallError;
 RUBY_EXTERN VALUE rb_eThreadError;
+RUBY_EXTERN VALUE rb_eTimeoutError;
 RUBY_EXTERN VALUE rb_eTypeError;
 RUBY_EXTERN VALUE rb_eZeroDivError;
 RUBY_EXTERN VALUE rb_eNotImpError;
```


``` diff git diff eval.c
diff --git a/eval.c b/eval.c
index 0bf8337..1304ad0 100644
--- a/eval.c
+++ b/eval.c
@@ -694,6 +694,8 @@ rb_iterator_p(void)
     return rb_block_given_p();
 }

+
+VALUE rb_eTimeoutError;
 VALUE rb_eThreadError;

 void
```


``` diff git diff thread.c
diff --git a/thread.c b/thread.c
index 4f1f409..1bdd657 100644
--- a/thread.c
+++ b/thread.c
@@ -821,7 +821,7 @@ thread_join(rb_thread_t *target_th, double delay)
        target_th->join_list = &list;
        if (!rb_ensure(thread_join_sleep, (VALUE)&arg,
                       remove_from_join_list, (VALUE)&arg)) {
-           return Qnil;
+            rb_raise(rb_eTimeoutError, "timeout in Thread#join.");
        }
     }

@@ -5103,6 +5103,7 @@ Init_Thread(void)

     recursive_key = rb_intern("__recursive_key__");
     rb_eThreadError = rb_define_class("ThreadError", rb_eStandardError);
+    rb_eTimeoutError = rb_define_class("TimeoutError", rb_eStandardError);

     /* init thread core */
     {
```


# 感想とか

思ったことを箇条書きで適当に。

* そもそも、タイムアウトで例外を発生させる動作が妥当なのか。
  * スレッドプログラミングをほとんどしたことがないので分からないのですが、例外が発生すると不便なこともあるんですかね?
  * C# の `Thread.join()` でも、bool 型の返り値によって、true なら正常終了、false ならタイムアウトとなっていて、
    現状のRubyと同じような仕様になっていました。
  * 詳しい人がもしいたら、コメントほしいです。
* 苦労した点
  * 特に無かったのですが、Thread#join の定義箇所を見つけるのに苦労しました。
  * というか、2,3行しかプログラムを書いてない...
