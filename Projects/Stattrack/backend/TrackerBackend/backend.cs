// Backend.cs
using System;                     // Gives access to basic system features like Console, Random, etc.
using System.Collections.Generic; // Lets us use collections such as List<T>

namespace GamblingGameBackend     // Defines a namespace (a container to organize related code)
{
    public enum Suit              // Enum = fixed set of named constant values for suits
    {
        Clubs,
        Diamonds,
        Hearts,
        Spades
    }

    public enum Rank              // Enum = fixed set of named constant values for ranks
    {
        Ace = 1,
        Two = 2,
        Three = 3,
        Four = 4,
        Five = 5,
        Six = 6,
        Seven = 7,
        Eight = 8,
        Nine = 9,
        Ten = 10,
        Jack = 11,
        Queen = 12,
        King = 13
    }

    public readonly struct Card : IEquatable<Card> // Struct = lightweight object type; readonly = cannot be modified after creation
                                                   // IEquatable lets us compare two Card objects properly
    {
        public Rank Rank { get; } // Read-only property storing the card’s rank
        public Suit Suit { get; } // Read-only property storing the card’s suit

        public Card(Rank rank, Suit suit) // Constructor runs when a new card is created
        {
            Rank = rank;  // Sets the rank of the card
            Suit = suit;  // Sets the suit of the card
        }

        public override string ToString() => $"{Rank} of {Suit}";
        // Converts the card into a readable string format

        public bool Equals(Card other) => Rank == other.Rank && Suit == other.Suit;
        // Returns true if BOTH rank and suit match another card

        public override bool Equals(object? obj) => obj is Card c && Equals(c);
        // Allows comparison with generic object types safely

        public override int GetHashCode() => HashCode.Combine((int)Rank, (int)Suit);
        // Generates a unique hash value (important for using cards in sets/dictionaries)
    }

    /// <summary>
    /// Standard 52 card deck that has no repeats while drawing
    /// </summary>
    public sealed class Deck // sealed = cannot be inherited by another class
    {
        private readonly List<Card> _cards = new();
        // Stores all cards in the deck

        private int _nextIndex = 0;
        // Tracks which card will be drawn next (prevents duplicates)

        private readonly Random _rng;
        // Random generator used for shuffling

        public Deck(int? seed = null)
        // Constructor that optionally accepts a seed for predictable randomness
        {
            _rng = seed.HasValue ? new Random(seed.Value) : new Random();
            // If a seed exists → use it
            // Otherwise → create normal random generator

            ResetAndShuffle();
            // Fills the deck and shuffles it (method defined elsewhere)
        }

        public int Remaining => _cards.Count - _nextIndex;
        // Property showing how many cards are left to draw

        /// <summary>
        /// Builds a fresh 52-card deck and shuffles it.
        /// </summary>
        public void ResetAndShuffle()
        {
            _cards.Clear();
            foreach (Suit s in Enum.GetValues(typeof(Suit)))
                foreach (Rank r in Enum.GetValues(typeof(Rank)))
                    _cards.Add(new Card(r, s));

            ShuffleInPlace(_cards);
            _nextIndex = 0;
        }

        /// <summary> 
        /// Draws the next card. No repeats are possible unless u reset it
        /// </summary>
        public Card Draw()
        {
            if (Remaining <= 0)
                throw new InvalidOperationException("No cards left in the deck.");

            return _cards[_nextIndex++]; // unique by design (we never reuse indices)
        }

        /// <summary>
        /// Draws multiple cards, all unique.
        /// </summary>
        public List<Card> Draw(int count)
        {
            if (count < 0) throw new ArgumentOutOfRangeException(nameof(count));
            if (count > Remaining) throw new InvalidOperationException("Not enough cards remaining to draw that many.");

            var hand = new List<Card>(count);
            for (int i = 0; i < count; i++) hand.Add(Draw());
            return hand;
        }

        private void ShuffleInPlace(List<Card> cards)
        {
            int n = cards.Count;
            for (int i = n - 1; i > 0; i--)
            {
                int j = _rng.Next(i + 1); // Random index from 0 to i
                (cards[i], cards[j]) = (cards[j], cards[i]); // Swap cards
            }
        }
    }

    public enum RoundResult
    {
        PlayerWin,
        HouseWin,
        Push
    }

    /// <summary>
    /// Player bets, draws 1 card, house draws 1 card. Higher rank wins.
    /// </summary>
    public sealed class HighCardGame
    {
        public Deck Deck { get; }
        public decimal PlayerBalance { get; private set; }

        public HighCardGame(decimal startingBalance, int? deckSeed = null)
        {
            if (startingBalance < 0) throw new ArgumentOutOfRangeException(nameof(startingBalance));
            PlayerBalance = startingBalance;
            Deck = new Deck(deckSeed);
        }

        public void AddFunds(decimal amount)
        {
            if (amount <= 0) throw new ArgumentOutOfRangeException(nameof(amount));
            PlayerBalance += amount;
        }

        /// <summary>
        /// Plays one round.
        /// Payout: win = 1:1, push = refund, lose = lose bet.
        /// </summary>
        public (RoundResult Result, Card PlayerCard, Card HouseCard, decimal BalanceAfter) PlayRound(decimal bet)
        {
            if (bet <= 0) throw new ArgumentOutOfRangeException(nameof(bet));
            if (bet > PlayerBalance) throw new InvalidOperationException("Insufficient balance for that bet.");

            // Ensure there are enough cards to complete the round; reshuffle if desired.
            if (Deck.Remaining < 2)
            {
                Deck.ResetAndShuffle();
            }

            PlayerBalance -= bet;

            Card player = Deck.Draw();
            Card house = Deck.Draw();

            int cmp = Compare(player, house);

            if (cmp > 0)
            {
                // Player wins: gets bet back + winnings (1:1)
                PlayerBalance += bet * 2m;
                return (RoundResult.PlayerWin, player, house, PlayerBalance);
            }
            else if (cmp < 0)
            {
                // House wins: bet already deducted
                return (RoundResult.HouseWin, player, house, PlayerBalance);
            }
            else
            {
                // Push: refund bet
                PlayerBalance += bet;
                return (RoundResult.Push, player, house, PlayerBalance);
            }
        }

        private static int Compare(Card a, Card b)
        {
            // Higher rank wins; if same rank, use suit as a deterministic tiebreaker.
            // (You can remove suit tiebreaker if you want true ties by rank.)
            int rankCmp = ((int)a.Rank).CompareTo((int)b.Rank);
            if (rankCmp != 0) return rankCmp;

            return ((int)a.Suit).CompareTo((int)b.Suit);
        }
    }
}