import { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { useAuth } from '../../../contexts/AuthContext';

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const { signUp, authError, clearError } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    clearError();

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setIsLoading(false);
      return;
    }

    try {
      const result = await signUp(formData.email, formData.password, {
        fullName: formData.fullName
      });

      if (result?.success) {
        setSuccess(true);
      }
    } catch (error) {
      console.log('Sign up error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <Icon name="CheckCircle" size={32} className="text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">
            Account Created Successfully!
          </h2>
          <p className="text-muted-foreground">
            Please check your email to verify your account before signing in.
          </p>
          <Button
            onClick={() => window.location.href = '/signin'}
            className="w-full"
          >
            Go to Sign In
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Sofa" size={24} color="white" />
            </div>
            <span className="text-2xl font-bold text-foreground">
              NilKamalFurniture Store
            </span>
          </div>
          <h2 className="text-3xl font-bold text-foreground">
            Create your account
          </h2>
          <p className="mt-2 text-muted-foreground">
            Join us and start furnishing your dream home
          </p>
        </div>

        {/* Sign Up Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {authError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {authError}
            </div>
          )}

          {formData.password !== formData.confirmPassword && formData.confirmPassword && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              Passwords do not match
            </div>
          )}

          {formData.password && formData.password.length < 6 && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              Password must be at least 6 characters long
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-foreground mb-2">
                Full Name
              </label>
              <Input
                id="fullName"
                name="fullName"
                type="text"
                autoComplete="name"
                required
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Email Address
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  className="w-full pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <Icon 
                    name={showPassword ? 'EyeOff' : 'Eye'} 
                    size={20} 
                    className="text-muted-foreground hover:text-foreground"
                  />
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  className="w-full pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <Icon 
                    name={showConfirmPassword ? 'EyeOff' : 'Eye'} 
                    size={20} 
                    className="text-muted-foreground hover:text-foreground"
                  />
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="agree-terms"
              name="agree-terms"
              type="checkbox"
              required
              className="h-4 w-4 text-primary focus:ring-primary border-border rounded"
            />
            <label htmlFor="agree-terms" className="ml-2 block text-sm text-foreground">
              I agree to the{' '}
              <a href="/terms" className="text-primary hover:text-primary-dark">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="/privacy" className="text-primary hover:text-primary-dark">
                Privacy Policy
              </a>
            </label>
          </div>

          <div>
            <Button
              type="submit"
              disabled={isLoading || formData.password !== formData.confirmPassword || formData.password.length < 6}
              className="w-full"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <Icon name="Loader" size={20} className="animate-spin mr-2" />
                  Creating account...
                </div>
              ) : (
                'Create Account'
              )}
            </Button>
          </div>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{' '}
              <a href="/signin" className="font-medium text-primary hover:text-primary-dark">
                Sign in here
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
