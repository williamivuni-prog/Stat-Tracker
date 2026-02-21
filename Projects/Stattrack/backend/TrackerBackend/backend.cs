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
            foreach( Suit s in Enum.GetValues(typeof(Suit)))
            foreach ( Rank r in Enum.GetValues(typeof(Rank)))
                _cards.add(new Card(r, s));
        }

    }
}