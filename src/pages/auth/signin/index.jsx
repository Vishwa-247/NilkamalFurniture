import { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { useAuth } from '../../../contexts/AuthContext';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { signIn, authError, clearError } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    clearError();

    // Demo login - accept any email/password combination
    if (email && password) {
      // Simulate loading delay for better UX
      setTimeout(() => {
        setIsLoading(false);
        // Redirect to home page
        window.location.href = '/';
      }, 1000);
    } else {
      setIsLoading(false);
      // Show error if fields are empty
      if (!email || !password) {
        // You can add error handling here if needed
        console.log('Please fill in all fields');
      }
    }
  };

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
            Welcome back!
          </h2>
          <p className="mt-2 text-muted-foreground">
            Sign in to your account to continue shopping
          </p>
        </div>

        {/* Sign In Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {authError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {authError}
            </div>
          )}

          <div className="space-y-4">
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
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
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-primary focus:ring-primary border-border rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-foreground">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="/forgot-password" className="font-medium text-primary hover:text-primary-dark">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <Icon name="Loader" size={20} className="animate-spin mr-2" />
                  Signing in...
                </div>
              ) : (
                'Sign in'
              )}
            </Button>
          </div>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{' '}
              <a href="/signup" className="font-medium text-primary hover:text-primary-dark">
                Sign up here
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
