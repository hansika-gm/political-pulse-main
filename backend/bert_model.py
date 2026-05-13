"""
BERT Sentiment Classification Model
Uses pretrained nlptown/bert-base-multilingual-uncased-sentiment
for high-accuracy political sentiment analysis
"""

from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch
import os

MODEL_NAME = 'nlptown/bert-base-multilingual-uncased-sentiment'

tokenizer = None
model = None


def load_model():
    """Load pretrained multilingual BERT sentiment model"""
    global tokenizer, model
    try:
        tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
        model = AutoModelForSequenceClassification.from_pretrained(MODEL_NAME)
        model.eval()
        print(f"BERT model loaded: {MODEL_NAME}")
    except Exception as e:
        print(f"Failed to load BERT model: {e}")
        print("Falling back to VADER for all predictions.")
        tokenizer = None
        model = None


def fine_tune(data_path: str = 'data/tweets_dataset_clean.csv', model_dir: str = 'models/bert') -> None:
    """Placeholder for BERT fine-tuning.

    The current backend uses a pretrained multilingual BERT sentiment model
    and does not perform task-specific fine-tuning in this release.
    """
    print("Fine-tuning is not implemented in this backend yet.")
    print("Using pretrained BERT model for sentiment inference instead.")

    if tokenizer is None or model is None:
        load_model()

    if model is not None and tokenizer is not None:
        os.makedirs(model_dir, exist_ok=True)
        model.save_pretrained(model_dir)
        tokenizer.save_pretrained(model_dir)
        print(f"Saved pretrained BERT model to {model_dir}")


def predict_sentiment_bert(text: str) -> dict:
    """
    Predict sentiment using BERT.
    Returns: { label: 'positive'|'negative'|'neutral', confidence: float }

    nlptown model outputs 1-5 stars:
    1-2 stars -> negative
    3 stars -> neutral
    4-5 stars -> positive
    """
    global tokenizer, model

    if tokenizer is None or model is None:
        try:
            load_model()
        except Exception:
            pass

    if tokenizer is None or model is None:
        # Fallback to VADER
        from sentiment_model import predict_vader
        vader = predict_vader(text)
        return {'label': vader['label'], 'confidence': abs(vader['compound'])}

    inputs = tokenizer(
        text,
        return_tensors='pt',
        truncation=True,
        max_length=512,
        padding='max_length',
    )

    with torch.no_grad():
        outputs = model(**inputs)
        probs = torch.nn.functional.softmax(outputs.logits, dim=1)[0]

    # Map 5 stars to 3 classes
    negative_prob = float(probs[0] + probs[1])  # 1-2 stars
    neutral_prob = float(probs[2])                # 3 stars
    positive_prob = float(probs[3] + probs[4])    # 4-5 stars

    scores = {
        'negative': negative_prob,
        'neutral': neutral_prob,
        'positive': positive_prob,
    }

    label = max(scores, key=scores.get)
    confidence = scores[label]

    return {
        'label': label,
        'confidence': round(confidence, 4),
        'scores': scores,
    }


if __name__ == '__main__':
    load_model()
    test_texts = [
        "The prime minister did an excellent job on climate policy!",
        "This government is corrupt and terrible for the country.",
        "The parliament voted on the new bill today.",
    ]
    for text in test_texts:
        result = predict_sentiment_bert(text)
        print(f"{text[:50]}... -> {result['label']} ({result['confidence']:.2%})")
