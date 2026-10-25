"""Shared natural-voice synthesis for the Learning Hub (copied from ELA Quest) (Kokoro-82M via kokoro-onnx, voice "af_heart").

Runs fully offline. Model files live in tools/tts-models/ (kokoro-v1.0.onnx, voices-v1.0.bin).
"""
import os, re
import numpy as np

HERE = os.path.dirname(os.path.abspath(__file__))
VOICE = 'af_heart'      # warm, gentle American English female voice
BLEND = [('af_heart', 0.7), ('af_nicole', 0.3)]  # chosen by the family (sample "D"): af_heart, a little softer
VOICE_ID = 'heart70-nicole30-s090'  # part of the clip cache key, so changing the voice re-records everything
SPEED = 0.90            # a touch slower than normal for young listeners
SR = 24000

_k = None
def kokoro():
    global _k
    if _k is None:
        from kokoro_onnx import Kokoro
        import onnxruntime as rt
        # VOICE_THREADS caps the threads per process, so several make_voice.py shards can share the CPU.
        opts = rt.SessionOptions()
        opts.intra_op_num_threads = int(os.environ.get('VOICE_THREADS', '0'))
        sess = rt.InferenceSession(os.path.join(HERE, 'tts-models', 'kokoro-v1.0.onnx'), sess_options=opts, providers=['CPUExecutionProvider'])
        _k = Kokoro.from_session(sess, os.path.join(HERE, 'tts-models', 'voices-v1.0.bin'))
    return _k

PUNCT = {'.': 'period', '?': 'question mark', '!': 'exclamation mark', ',': 'comma'}

def prepare(text, kind='', words=frozenset()):
    """Return the text Kokoro should read (the caption/display text is unchanged)."""
    t = text.strip()
    if t in PUNCT: return PUNCT[t]
    short = re.fullmatch(r'[a-z]{1,3}', t)
    if kind == 'tile' or (words is not None and short and (len(t) == 1 or t not in words)):
        # letters and letter chunks: Kokoro spells unknown clusters ("sh" -> "S H") and says vowel teams as sounds
        return t if len(t) > 1 else t.upper() + '.'
    return t

def fix_phonemes(ph):
    # "the a says…" is read as the article "uh"; in these lessons it always means the letter A.
    for a, b in [('ðɪ ɐ ', 'ðɪ ˈeɪ '), ('ðə ɐ ', 'ðə ˈeɪ '), ('lˈɛɾɚɹ ɐ ', 'lˈɛɾɚɹ ˈeɪ '), ('lˈɛɾɚ ɐ ', 'lˈɛɾɚ ˈeɪ ')]:
        ph = ph.replace(a, b)
    return ph

def synth(text, kind='', words=frozenset(), speed=None):
    k = kokoro()
    t = prepare(text, kind, words)
    sp = speed or (0.62 if kind == 'slow' else SPEED)
    ph = fix_phonemes(k.tokenizer.phonemize(t, 'en-us'))
    style = sum(w * k.get_voice_style(n) for n, w in BLEND)
    audio, sr = k.create(ph, voice=style, speed=sp, is_phonemes=True)
    assert sr == SR
    return np.asarray(audio, dtype=np.float32)
