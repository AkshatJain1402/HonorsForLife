import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const LandingPage = () => {
  return (
    <ScrollView style={styles.container}>
      <Navbar />

      {/* Hero Section */}
      <View style={styles.heroSection}>
        <Text style={styles.heroTitle}>Welcome to Honor for Life</Text>
        <Text style={styles.heroDescription}>
          Celebrate your achievements and share your awards with the world. Join
          a community that honors success.
        </Text>
        <TouchableOpacity style={styles.ctaButton}>
          <Text style={styles.ctaButtonText}>Get Started</Text>
        </TouchableOpacity>
      </View>

      {/* Features Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Why Choose Honor for Life?</Text>
        <View style={styles.featuresContainer}>
          <View style={styles.featureCard}>
            <Text style={styles.featureIcon}>🏆</Text>
            <Text style={styles.featureTitle}>Showcase Your Awards</Text>
            <Text style={styles.featureDescription}>
              Display your medals, trophies, and certificates in one place.
            </Text>
          </View>

          <View style={styles.featureCard}>
            <Text style={styles.featureIcon}>🤝</Text>
            <Text style={styles.featureTitle}>Connect with Others</Text>
            <Text style={styles.featureDescription}>
              Share your achievements and inspire others in the community.
            </Text>
          </View>

          <View style={styles.featureCard}>
            <Text style={styles.featureIcon}>📈</Text>
            <Text style={styles.featureTitle}>Track Your Progress</Text>
            <Text style={styles.featureDescription}>
              See how far you've come and set new goals for the future.
            </Text>
          </View>
        </View>
      </View>

      {/* Testimonials Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>What Our Users Say</Text>
        <View style={styles.testimonialsContainer}>
          <View style={styles.testimonialCard}>
            <Text style={styles.testimonialText}>
              "Honor for Life helped me showcase my achievements and connect
              with like-minded individuals. Highly recommended!"
            </Text>
            <Text style={styles.testimonialAuthor}>- John Doe</Text>
          </View>

          <View style={styles.testimonialCard}>
            <Text style={styles.testimonialText}>
              "The platform is easy to use, and the community is incredibly
              supportive. Love it!"
            </Text>
            <Text style={styles.testimonialAuthor}>- Jane Smith</Text>
          </View>
        </View>
      </View>

      {/* CTA Section */}
      <View style={[styles.section, styles.ctaSection]}>
        <Text style={styles.sectionTitle}>
          Ready to Showcase Your Achievements?
        </Text>
        <TouchableOpacity style={[styles.ctaButton, styles.ctaSecondary]}>
          <Text style={styles.ctaButtonText}>Join Now</Text>
        </TouchableOpacity>
      </View>

      <Footer />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  heroSection: {
    padding: 24,
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    paddingVertical: 48,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#1a1a1a',
  },
  heroDescription: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 32,
    color: '#666',
    lineHeight: 24,
  },
  section: {
    padding: 24,
    paddingVertical: 48,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 32,
    color: '#1a1a1a',
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureCard: {
    width: '30%',
    marginBottom: 24,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  featureIcon: {
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 16,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
    color: '#1a1a1a',
  },
  featureDescription: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    lineHeight: 20,
  },
  testimonialsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  testimonialCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  testimonialText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 20,
  },
  testimonialAuthor: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
    textAlign: 'right',
  },
  ctaSection: {
    backgroundColor: '#f8f9fa',
  },
  ctaButton: {
    backgroundColor: '#0066cc',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignSelf: 'center',
  },
  ctaButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  ctaSecondary: {
    backgroundColor: '#1a1a1a',
  },
});

export default LandingPage;
