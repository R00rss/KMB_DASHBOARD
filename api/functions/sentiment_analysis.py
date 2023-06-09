import nltk

nltk.downloader.download("vader_lexicon")
# from googletrans import Translator
from nltk.sentiment.vader import SentimentIntensityAnalyzer
import translators as ts

sid = SentimentIntensityAnalyzer()


def get_polarity_from_string(sentence):
    return sid.polarity_scores(
        ts.translate_text(sentence, translator="google", to_language="en")
    )
