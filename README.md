# Introduction

As more powerful quantum computers are developed, the need for cryptosystems that are resistent to attacks based on quantum algorithms becomes more apparent. Popular public key cryptosystems such as RSA and ECC appear to be quite different, but at a fundamental level they are based on the same kind of mathematical structure: abelian groups.A promising approach to developing quantum-resistent cryptosystems is to base them on *nonabelian* groups instead. 

# What are groups?

Although group theory may seem daunting, the definition of a group is fairly simple. A group, $G$, is composed of a set of elements and a binary operation, $(*)$ that follows a few constraints

- **Closure**: $a * b \in G$, for all $a,b \in G$
- **Associativity**: $a * (b * c) = (a * b) * c$, for all $a,b,c \in G$
- **Identity**: There exists an identity element, $e$, such that $e * a = a * e = a$ for all $a \in G$
- **Inverse**: For every element, $a \in G$, there exists an inverse, $a^{-1}$ such that $a * a^{-1} = a^{-1} * a = e$. 

*(Notice that it is not a requirement that the inverse of an element be distinct from the element itself; an element can be its own inverse. The inverse of the identity element is always the identity element, for example.)*

This may sound abstract, and that is because it is! This is abstract algebra. But there are plenty of familiar examples. For example, take integers and addition. That is a group!

- **Closure**: Any integer added to another integer is an integer
- **Associativity**: $a + (b + c) = (a + b) + c$, for any three integers, $a,b$ and $c$
- **Identity**: The identity element here is $0$. Add $0$ to any number, and the result is that number
- **Inverse**: The inverse of any integer is that number multiplied by $-1$

Elements of groups do not always have to be numbers. Many groups have intuitive numerical representations, but many do not. As an example, the general linear group, $GL(n, F)$, is composed of $n \times n$ invertible matrices over the field, $F$. For another example, the moves on a Rubik's cube actually form a group. It even has its own name: the Rubik's cube group!

For the Rubik's cube group, the elements are all the legal ways of permuting a Rubik's cube, and the binary operation is the composition of permutations. Here, "legal" just means that the moves can be made without pulling apart the cube or otherwise manipulating the pieces besides twisting its layers, and legal permutations are ones that can be solved using only legal moves. This fits within all four constraints described above:

- **Closure**: Any set of legal moves made on a Rubik's cube that is already in a legal permutation will result in another legal permutation.
- **Associativity**: Sequences of moves can be viewed as functions, taking a permutation of the cube as an input and giving a permutation of the cube as an output. Since function composition is associative, the composition of permutations is associative as well.
- **Identity**: The identity element here is the solved cube
- **Inverse**: The inverse of a permutation is the sequence of moves necessary to solve the cube from that permutation. 

*(Notice that multiple different sequences of moves may solve the same cube. This does not mean that permutations may have multiple different inverses, though. If two sequences of moves result in the same permutation, then they are considered the same element from a group theoretic perspective. This is significant because telling if two representations refer to the same element is not always a trivial task, and may in fact be fairly complex in some cases)*

## Nonabelian Groups

Notice that while associativity is a requirement for groups, commutativity is not. Addition over the integers is commutative, but matrix multiplication is not. Groups whose binary operation is commutative are called "abelian", while groups whose binary operation is noncommutative are called "nonabelian". So the group of integers under addition is an abelian group, and general linear groups are nonabelian for $n > 1$.

For another example, the Rubik's cube group is nonabelian. Making a turn on the top layer and then the right layer results in a different permutation than turning the right layer first and then the top layer. This is part of what makes solving the Rubik's cube interesting in the first place. If the Rubik's cube group was abelian, you wouldn't have to take the order of your moves into consideration. 

Intuitively, this is where the power of nonabelian groups as the basis for cryptosystems lies. There is an obvious difference in complexity between solving $x + 5 = 8$ and solving a Rubik's cube. Nonabelian group-based cryptography doesn't literally involve solving Rubik's cubes, of course. Instead, we are looking for some kind of "algebraic invariant" that is easy to construct with access to private information, but practically impossible (Or even theoretically impossible!) to construct without said information.

## Conjugation and Commutators

The algebraic invariant used in the Anshel-Anshel-Goldfeld key exchange is a commutator of two private elements in some nonabelian group. The information about what these private elements are is obscured through conjugation, but the commutator itself is invariant and thus can be easily recovered with knowledge of at least one of the private elements.

Conjugation is a simple operation. For any two elements, $a, b \in G$, the conjugate of $a$ by $b$ is $bab^{-1}$. In abelian groups, conjugating $a$ by $b$ always gives $a$ back. This is because, in a commutative group, $bab^{-1}=bb^{-1}a=ea=a$. In nonabelian groups, however, conjugation of $a$ by $b$ only results in $a$ if $a$ and $b$ themselves commute.

The commutator of two elements, $a, b \in G$, is equal to $a^{-1}b^{-1}ab$. In an abelian group, the commutator of any two elements is the identity element, $e$. In nonabelian groups, however, the commutator of any two elements is only $e$ if those elements commute. If two elements do not commute, the commutator is essentially an indicator of the *extent* to which they don't commute. In other words, the commutator of two elements will be "closer" to $e$ if they "kind of" commute, and "farther" from $e$ if they are "more" noncommutative. 

Now, what does it mean for an element to be "closer" or "farther" from the identity in a group? To determine that, we need something known as a length function. A length function, $L : G \rightarrow \mathbb{R}^{+}$ is defined as such:
- $L(e) = 0$
- $L(a) = L(a^{-1})$ for all $a \in G$
- $L(ab) \leq L(a) + L(b)$ for all $a,b \in G$

For this key exchange protocol, we don't actually care about the length of the commutator itself. However, understanding length functions will be important when we are looking at the kinds of attacks that AAG may be susceptible to. 

# The Anshel-Anshel-Goldfeld Protocol

For the protocol, we use some nonabelian base group, $G$.

# Security