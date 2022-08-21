# moviepy - 视频编辑模块

- MoviePy 是一个用于视频编辑的 Python 模块，它可被用于一些基本操作、视频合成、视频处理和创建高级特效。它可对大多数常见视频格式进行读写，包括GIF。

> 文档：<https://zulko.github.io/moviepy/>

- Pydub 是一个简洁易用的 Python 音频处理模块：

> <https://github.com/jiaaro/pydub#installation>

本文使用 MoviePy 给上一篇的东京奥运会冠军搜索热度视频添加开头和BGM。

## 安装

``` bash
pip install moviepy
pip install pydub
```

## 视频拼接

给视频添加一个3s时长的开头简介：

![img](./image/moviepy.png)

``` python
from moviepy.editor import *

#导入原视频
middle_clip = VideoFileClip('Video_Material/冠军搜索热度.mp4', audio=False)

#添加的部分：由ColorClip、TextClip、TextClip、ImageClip四个clip图层叠加形成
bg_clip = ColorClip(middle_clip.size, (255, 255, 255), duration=3)
title_clip = TextClip(
    '奥运冠军搜索热度',
    fontsize=100,
    color='gold',
    stroke_color='black',
    stroke_width=0.5,
    bg_color='transparent',
    font='Video_Font/STCAIYUN.TTF',
    size=(1920, 700))
title_clip = title_clip.set_position(('center', 'top')).set_duration(3)
notes_clip = TextClip(
    '数据来源于百度搜索指数\n是东京奥运会所有中国队夺冠选手（包含个人赛和团体赛）的百度搜索指数',
    fontsize=40,
    color='black',
    font='Video_Font/msyh.ttc',
    size=(1920, 700))
notes_clip = notes_clip.set_position(('center', 'bottom')).set_duration(3)
img_clip = ImageClip('Video_Material/xugw.png')
img_clip = img_clip.resize(0.1).set_position(
    ('center', 'center')).set_duration(3)
head_clip = CompositeVideoClip([bg_clip, notes_clip, img_clip, title_clip])

#顺序拼接
final_video_clip = concatenate_videoclips([head_clip, middle_clip])
final_video_clip.write_videofile('Video_Material/冠军搜索热度.mp4', fps=30)
```

## 添加BGM

``` python
import os
from pydub import AudioSegment
from moviepy.editor import VideoFileClip, AudioFileClip

video_clip = VideoFileClip('Video_Material/冠军搜索热度.mp4', audio=False)
#获取原视频时长
video_duration = video_clip.duration * 1000

#使用Pydub导入BGM对应的音频
song = AudioSegment.from_mp3('Video_Material/2008北京奥运CCTV巅峰时刻背景音乐.mp3')
#截取与视频相同的时长
song = song[:video_duration]
#给音频添加3s淡入淡出效果
song = song.fade_in(3000).fade_out(3000)
song.export('python_temp.mp3', format='mp3')

#使用MoviePy给视频添加由Pydub处理过的BGM
audio_clip = AudioFileClip('python_temp.mp3')
audio_clip = audio_clip.set_duration(video_clip.duration)
video_clip = video_clip.set_audio(audio_clip)
video_clip.write_videofile('Video_Output/冠军搜索热度.mp4', fps=30)

#删除中间生成的临时音频文件
for file in os.scandir():
    if file.name.endswith('python_temp.mp3'):
        os.remove(file)
```

## 最终效果

<iframe src="//player.bilibili.com/player.html?aid=419687623&amp;bvid=BV163411r7Aw&amp;cid=385169533&amp;page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" height="210" width="320"> </iframe>
